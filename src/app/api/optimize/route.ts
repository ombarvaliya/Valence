import { NextResponse } from 'next/server';
import { getOptimizedSites } from '@/lib/data'; // Import the new function

export async function GET(req: Request) {
  try {
    const allResults = await getOptimizedSites();
    return NextResponse.json({ success: true, data: allResults }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error processing built-in dataset.' }, { status: 500 });
  }
}