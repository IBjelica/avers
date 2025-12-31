import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_7nXdm73k_FVoA5Mk41o8KZtzNJyAqfHFe");

export async function POST(request: Request) {
  try {
    const { name, email, message, turnstileToken } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate Turnstile token if provided
    if (turnstileToken) {
      try {
        const turnstileResponse = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              secret: process.env.TURNSTILE_SECRET_KEY!,
              response: turnstileToken,
            }),
          }
        );

        const turnstileResult = await turnstileResponse.json();

        if (!turnstileResult.success) {
          return NextResponse.json(
            { error: "Turnstile verification failed" },
            { status: 400 }
          );
        }
      } catch (error) {
        // If Turnstile verification fails due to network issues, allow submission
        // This provides a fallback in case of Cloudflare API issues
        console.warn("Turnstile verification error:", error);
      }
    } else {
      // If no token is provided, allow submission as fallback
      // This handles cases where Turnstile fails to load or initialize
      console.warn("No Turnstile token provided - allowing submission as fallback");
    }

    const data = await resend.emails.send({
      from: "Avers Financial <contact@aversacc.com>",
      to: "aversacc@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
