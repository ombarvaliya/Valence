import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Asset from '@/models/Asset';
import { getUserAssets } from '@/lib/data';

// --- THIS IS THE CRUCIAL FIX ---
// This line tells Next.js to always run this route on the server dynamically
// and never cache the result.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const assets = await getUserAssets(session.user.id);
    return NextResponse.json({ success: true, data: assets });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: 'Unauthorized: No session found' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    await dbConnect();

    const newAsset = await Asset.create({
      ...body,
      userId: userId,
    });

    return NextResponse.json({ success: true, data: newAsset }, { status: 201 });
  } catch (error: any) {
    console.error("[API/ASSETS/POST] Server Error:", error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}