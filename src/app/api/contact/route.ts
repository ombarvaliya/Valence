import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }

    // --- Server-Side Action ---
    // In a real application, you would add an email service here.
    // For now, we log the submission to the server console.
    console.log('--- New Contact Form Submission ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------------');

    return NextResponse.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' }, { status: 200 });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, message: 'Server error occurred.' }, { status: 500 });
  }
}