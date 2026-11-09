import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/enquiry/route';

describe('Enquiry API Route Handler (/api/enquiry)', () => {
  it('successfully accepts a valid lead submission', async () => {
    const req = new Request('http://localhost:3001/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.101',
      },
      body: JSON.stringify({
        name: 'Export Manager',
        email: 'procurement@fashionhouse.com',
        phone: '+971 50 123 4567',
        product: 'BSY Fabrics',
        message: 'Looking for 20,000 meters of jet-black dyed BSY quality.',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.message).toContain('Thank you for your enquiry');
    expect(json.data.name).toBe('Export Manager');
  });

  it('rejects submissions with missing fields', async () => {
    const req = new Request('http://localhost:3001/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.102',
      },
      body: JSON.stringify({
        name: 'Incomplete Request',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Please provide all required fields');
  });

  it('rejects submissions with invalid email formats', async () => {
    const req = new Request('http://localhost:3001/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.103',
      },
      body: JSON.stringify({
        name: 'Valid Name',
        email: 'invalid-email-no-at-sign',
        phone: '+91 94279 88999',
        product: 'Satin',
        message: 'Valid length enquiry message.',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('valid email');
  });

  it('rejects submissions with invalid phone number format', async () => {
    const req = new Request('http://localhost:3001/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.104',
      },
      body: JSON.stringify({
        name: 'Valid Name',
        email: 'test@example.com',
        phone: '123',
        product: 'Satin',
        message: 'Valid length enquiry message.',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('phone number');
  });

  it('enforces rate limiting when request threshold is exceeded', async () => {
    const spammerIp = '10.0.0.99';
    const makeReq = () =>
      new Request('http://localhost:3001/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': spammerIp,
        },
        body: JSON.stringify({
          name: 'Spam Bot',
          email: 'bot@spam.com',
          phone: '+1 800 555 0199',
          product: 'Crepe',
          message: 'Repeated spam attempt.',
        }),
      });

    // Make 5 allowed requests
    for (let i = 0; i < 5; i++) {
      await POST(makeReq());
    }

    // 6th request must trigger 429
    const blockedRes = await POST(makeReq());
    expect(blockedRes.status).toBe(429);

    const json = await blockedRes.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Too many enquiry attempts');
  });
});

