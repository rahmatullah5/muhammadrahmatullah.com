/** @format */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import twilio from "twilio";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    console.log("Contact form submission:", { name, email, message });

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Send Email Notification
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        const transport = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transport.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.SMTP_USER, // Send to self
          subject: `New Contact Form Submission from ${name}`,
          html: `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
        });
        console.log("Email notification sent.");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
    }

    // 2. Send WhatsApp Notification
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_FROM_WHATSAPP &&
      process.env.TWILIO_TO_WHATSAPP
    ) {
      try {
        const client = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN,
        );
        await client.messages.create({
          body: `New Contact from ${name} (${email}): ${message}`,
          from: `whatsapp:${process.env.TWILIO_FROM_WHATSAPP}`,
          to: `whatsapp:${process.env.TWILIO_TO_WHATSAPP}`,
        });
        console.log("WhatsApp notification sent.");
      } catch (waError) {
        console.error("Failed to send WhatsApp notification:", waError);
      }
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
