import { describe, it, expect } from 'vitest';
import { getPublishedFabrics, getFabricBySlug } from '@/lib/fabricsService';

describe('Fabrics Service Layer', () => {
  it('falls back to static catalogue when MongoDB is not connected', async () => {
    const fabrics = await getPublishedFabrics();
    expect(Array.isArray(fabrics)).toBe(true);
    expect(fabrics.length).toBeGreaterThanOrEqual(10);

    const first = fabrics[0];
    expect(first).toHaveProperty('slug');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('description');
    expect(first).toHaveProperty('image');
    expect(first.isPublished).toBe(true);
  });

  it('retrieves specific fabric by slug', async () => {
    const bsy = await getFabricBySlug('bsy-fabrics');
    expect(bsy).not.toBeNull();
    expect(bsy?.slug).toBe('bsy-fabrics');
    expect(bsy?.title).toContain('BSY');
  });

  it('returns null for non-existent fabric slug', async () => {
    const nonExistent = await getFabricBySlug('non-existent-fabric-slug-12345');
    expect(nonExistent).toBeNull();
  });
});

