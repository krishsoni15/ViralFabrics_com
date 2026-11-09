import { describe, it, expect } from 'vitest';
import { rateLimit } from '@/lib/rateLimit';

describe('Rate Limiter Utility', () => {
  it('allows requests within limit', () => {
    const ip = 'test-ip-1';
    const res1 = rateLimit(ip, 3, 60);
    expect(res1.allowed).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = rateLimit(ip, 3, 60);
    expect(res2.allowed).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = rateLimit(ip, 3, 60);
    expect(res3.allowed).toBe(true);
    expect(res3.remaining).toBe(0);
  });

  it('rejects requests exceeding limit', () => {
    const ip = 'test-ip-blocked';
    rateLimit(ip, 2, 60);
    rateLimit(ip, 2, 60);

    const blocked = rateLimit(ip, 2, 60);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInSeconds).toBeGreaterThan(0);
  });

  it('isolates different IP addresses', () => {
    const ipA = 'user-a';
    const ipB = 'user-b';

    rateLimit(ipA, 1, 60);
    const blockedA = rateLimit(ipA, 1, 60);
    expect(blockedA.allowed).toBe(false);

    const allowedB = rateLimit(ipB, 1, 60);
    expect(allowedB.allowed).toBe(true);
  });
});

