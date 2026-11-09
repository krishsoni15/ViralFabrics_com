import { describe, it, expect } from 'vitest';
import { COMPANY_INFO } from '@/data/company';
import { FABRICS } from '@/data/fabrics';

describe('Company and Fabric Data Integrity', () => {
  it('contains valid Surat company contact details', () => {
    expect(COMPANY_INFO.name).toBe('Viral Fabrics Pvt. Ltd.');
    expect(COMPANY_INFO.phone).toMatch(/^\+91/);
    expect(COMPANY_INFO.email).toContain('@');
    expect(COMPANY_INFO.address.city).toBe('Surat');
    expect(COMPANY_INFO.address.state).toBe('Gujarat');
    expect(COMPANY_INFO.established).toBe(2012);
  });

  it('contains all 10 core fabric qualities with required metadata', () => {
    expect(FABRICS.length).toBe(10);

    const slugs = new Set<string>();
    FABRICS.forEach((fabric) => {
      expect(fabric.title).toBeTruthy();
      expect(fabric.slug).toBeTruthy();
      expect(fabric.description).toBeTruthy();
      expect(fabric.image).toBeTruthy();
      expect(fabric.gsmRange).toBeTruthy();
      expect(slugs.has(fabric.slug)).toBe(false);
      slugs.add(fabric.slug);
    });
  });
});
