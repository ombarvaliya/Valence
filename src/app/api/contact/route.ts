import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

// Your "To" and "From" addresses
const toEmail = 'valence.contactus@gmail.com';
const fromEmail = 'onboarding@resend.dev'; // Resend's default for testing

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    // --- EMAIL 1: SEND NOTIFICATION TO YOU (THE ADMIN) ---
    // This part remains the same.
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email, // This allows you to directly "reply" to the user from your inbox
      html: `
        <div>
          <h2>New Inquiry from Valence Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    // --- EMAIL 2: SEND CONFIRMATION TO THE USER ---
    // This is the new part we are adding.
    await resend.emails.send({
      from: fromEmail,
      to: email, // The user's email address from the form
      subject: 'We have received your message | Valence',
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="color: #22c55e;">Thank you for contacting Valence!</h2>
          <p>Hello ${name},</p>
          <p>This is an automated confirmation that we have successfully received your message. Our team will review your inquiry and get back to you as soon as possible.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The Valence Team</strong></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Emails sent successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ success: false, message: 'Error sending email.' }, { status: 500 });
  }
}