import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, product, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields (Name, Email, Phone, Message).' },
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

    console.log('[ENQUIRY RECEIVED]', {
      name,
      email,
      phone,
      product: product || 'General Fabric Enquiry',
      message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. Our team will contact you shortly.',
      data: { name, email, phone, product }
    });
  } catch (error) {
    console.error('[ENQUIRY ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process enquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
