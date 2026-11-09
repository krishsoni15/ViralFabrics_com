import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/fabrics/route';

describe('Fabrics API Route Handler (/api/fabrics)', () => {
  it('returns HTTP 200 with JSON payload of fabrics', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data.length).toBeGreaterThanOrEqual(10);

    const first = json.data[0];
    expect(first).toHaveProperty('slug');
    expect(first).toHaveProperty('name');
  });
});

