import { NextResponse } from 'next/server';
import { getPublishedFabrics } from '@/lib/fabricsService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const fabrics = await getPublishedFabrics();
    return NextResponse.json({ success: true, data: fabrics });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch fabrics' },
      { status: 500 }
    );
  }
}
