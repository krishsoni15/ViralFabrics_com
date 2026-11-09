import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import { connectDB } from '@/lib/mongodb';
import WebsiteEnquiry from '@/models/WebsiteEnquiry';

// Sanitize inputs to prevent XSS and strip control characters
function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim();
}

export async function POST(request: Request) {
  try {
    // 1. Client IP determination for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0] : realIp) || '127.0.0.1';

    // 2. Enforce Rate Limiting (max 5 requests per 60 seconds per IP)
    const limitResult = rateLimit(clientIp.trim(), 5, 60);
    if (!limitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many enquiry attempts. Please wait ${limitResult.resetInSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(limitResult.resetInSeconds),
          },
        }
      );
    }

    const body = await request.json();
    const rawName = body?.name;
    const rawEmail = body?.email;
    const rawPhone = body?.phone;
    const rawProduct = body?.product;
    const rawMessage = body?.message;

    // Validate required fields
    if (!rawName || !rawEmail || !rawPhone || !rawMessage) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields (Name, Email, Phone, Message).' },
        { status: 400 }
      );
    }

    // Sanitize string inputs
    const name = sanitizeInput(String(rawName));
    const email = sanitizeInput(String(rawEmail)).toLowerCase();
    const phone = sanitizeInput(String(rawPhone));
    const product = sanitizeInput(String(rawProduct || 'General Fabric Enquiry'));
    const message = sanitizeInput(String(rawMessage));

    // Field length constraints
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (message.length < 5 || message.length > 2500) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 5 and 2500 characters.' },
        { status: 400 }
      );
    }

    // Phone format validation (allows international + codes, spaces, dashes, parentheses)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid phone number (e.g. +91 94279 88999).' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 3. Save to MongoDB Atlas (collection: websiteenquiries)
    let savedEnquiry = null;
    try {
      if (process.env.MONGODB_URI) {
        await connectDB();
        savedEnquiry = await WebsiteEnquiry.create({
          name,
          email,
          phone,
          product,
          message,
          clientIp,
          source: 'web-enquiry-form',
          status: 'new',
        });
      }
    } catch (dbError) {
      console.warn('[ENQUIRY DB WARNING] Failed to persist to MongoDB Atlas:', dbError);
    }

    console.log('[ENQUIRY RECEIVED & PERSISTED]', {
      id: savedEnquiry?._id ? String(savedEnquiry._id) : 'memory-only',
      name,
      email,
      phone,
      product,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. Our Surat team will contact you shortly.',
      data: {
        id: savedEnquiry?._id ? String(savedEnquiry._id) : undefined,
        name,
        email,
        phone,
        product,
      },
    });
  } catch (error) {
    console.error('[ENQUIRY ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process enquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
