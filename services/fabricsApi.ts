import type { LiveFabric } from '@/types';

export interface FabricsApiResponse {
  success: boolean;
  count?: number;
  data: LiveFabric[];
  error?: string;
}

export async function fetchPublishedFabrics(
  target?: 'all' | 'menu' | 'homepage' | 'enquiry' | 'catalog' | boolean
): Promise<LiveFabric[]> {
  if (
    typeof window === 'undefined' ||
    !window.location ||
    !window.location.origin ||
    window.location.origin === 'null'
  ) {
    return [];
  }

  try {
    let url = '/api/fabrics';
    if (target === true || target === 'menu') {
      url = '/api/fabrics?menu=true';
    } else if (target === 'homepage') {
      url = '/api/fabrics?homepage=true';
    } else if (target === 'enquiry') {
      url = '/api/fabrics?enquiry=true';
    } else if (target === 'catalog') {
      url = '/api/fabrics?catalog=true';
    }

    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: FabricsApiResponse = await res.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.warn('[Fabrics API Client] Failed to fetch live fabrics:', error);
    return [];
  }
}
