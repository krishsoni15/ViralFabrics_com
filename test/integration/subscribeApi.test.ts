import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/subscribe/route';

describe('Newsletter Subscribe API Route Handler (/api/subscribe)', () => {
  it('successfully accepts a valid email subscriber', async () => {
    const req = new Request('http://localhost:3001/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.2.10',
      },
      body: JSON.stringify({
        email: 'buyer@textilegroup.com',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.email).toBe('buyer@textilegroup.com');
  });

  it('rejects submissions without an email', async () => {
    const req = new Request('http://localhost:3001/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.2.11',
      },
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it('rejects invalid email formats', async () => {
    const req = new Request('http://localhost:3001/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.2.12',
      },
      body: JSON.stringify({
        email: 'not-an-email',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
  });
});

