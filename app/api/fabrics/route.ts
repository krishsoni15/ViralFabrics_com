import { NextRequest, NextResponse } from 'next/server';
import { 
  getPublishedFabrics, 
  getMenuFabrics, 
  getHomepageFabrics, 
  getEnquiryFabrics, 
  getCatalogFabrics 
} from '@/lib/fabricsService';

export const dynamic = 'force-dynamic';

export async function GET(request?: NextRequest) {
  try {
    let mode: 'all' | 'menu' | 'homepage' | 'enquiry' | 'catalog' = 'all';

    if (request && request.url) {
      try {
        const { searchParams } = new URL(request.url);
        if (searchParams.get('menu') === 'true') mode = 'menu';
        else if (searchParams.get('homepage') === 'true') mode = 'homepage';
        else if (searchParams.get('enquiry') === 'true') mode = 'enquiry';
        else if (searchParams.get('catalog') === 'true') mode = 'catalog';
      } catch {
        mode = 'all';
      }
    }

    let fabrics;
    switch (mode) {
      case 'menu':
        fabrics = await getMenuFabrics();
        break;
      case 'homepage':
        fabrics = await getHomepageFabrics();
        break;
      case 'enquiry':
        fabrics = await getEnquiryFabrics();
        break;
      case 'catalog':
        fabrics = await getCatalogFabrics();
        break;
      default:
        fabrics = await getPublishedFabrics();
        break;
    }

    return NextResponse.json({ success: true, count: fabrics.length, data: fabrics });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch fabrics';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
