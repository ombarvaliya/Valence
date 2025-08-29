import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Asset from '@/models/Asset';

// --- GET All Assets ---
export async function GET(request: Request) {
  try {
    await dbConnect();

    const assets = await Asset.find({});

    return NextResponse.json({
      success: true,
      data: assets,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server Error: Failed to fetch assets',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// --- CREATE a New Asset ---
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json(); // 1. Get the data from the request body
    const asset = await Asset.create(body); // 2. Create a new asset document

    // 3. Return a success response with the new data
    return NextResponse.json({
      success: true,
      data: asset,
    }, { status: 201 }); // 201 Created status

  } catch (error) {
    // 4. Handle errors, including validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Validation Error: Please check your data',
        error: error.message,
      }, { status: 400 }); // 400 Bad Request status
    }
    
    return NextResponse.json({
      success: false,
      message: 'Server Error: Failed to create asset',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

