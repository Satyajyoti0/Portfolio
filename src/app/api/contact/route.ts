import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";


const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {

    const body = await request.json();

    // Validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Email Sending
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "user",
        pass: process.env.SMTP_PASS || "pass",
      },
    });

    // Mock sending if no credentials provided (for development/demo)
    if (!process.env.SMTP_HOST) {
      console.log("Mock Email Sent:", { name, email, message });
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true });
    }

    const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6; 
        color: #1e293b; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 20px;
      }
      .container { 
        max-width: 600px; 
        margin: 0 auto; 
        background: #ffffff; 
        border-radius: 16px; 
        overflow: hidden; 
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }
      .header { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 32px; 
        text-align: center; 
        position: relative;
        overflow: hidden;
      }
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.5;
      }
      .header-icon {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
      }
      .header h1 { 
        margin: 0; 
        font-size: 28px; 
        font-weight: 700; 
        color: #ffffff;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .header p {
        margin-top: 8px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        position: relative;
        z-index: 1;
      }
      .content { 
        padding: 40px 32px; 
        background: #ffffff;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 24px;
      }
      .badge::before {
        content: '';
        width: 6px;
        height: 6px;
        background: #ffffff;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }
      .field { 
        margin-bottom: 28px;
        background: #f8fafc;
        border-radius: 12px;
        padding: 20px;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
      }
      .field:hover {
        border-color: #667eea;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
      }
      .label { 
        font-size: 11px; 
        text-transform: uppercase; 
        letter-spacing: 1px; 
        color: #64748b; 
        margin-bottom: 10px; 
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .label::before {
        content: '';
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
      }
      .value { 
        font-size: 16px; 
        color: #1e293b; 
        line-height: 1.7;
      }
      .value strong {
        color: #667eea;
        font-weight: 600;
      }
      .email-link {
        color: #667eea;
        text-decoration: none;
        padding: 2px 8px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 6px;
        transition: all 0.2s ease;
        display: inline-block;
      }
      .email-link:hover {
        background: rgba(102, 126, 234, 0.2);
      }
      .message-box {
        background: #ffffff;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        margin-top: 8px;
        white-space: pre-wrap;
        font-size: 15px;
        line-height: 1.8;
        color: #334155;
      }
      .divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
        margin: 32px 0;
      }
      .footer { 
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        padding: 32px; 
        text-align: center;
        border-top: 1px solid #e2e8f0;
      }
      .footer-icon {
        font-size: 24px;
        margin-bottom: 12px;
      }
      .footer p {
        font-size: 13px;
        color: #64748b;
        margin: 4px 0;
      }
      .footer strong {
        color: #475569;
        font-weight: 600;
      }
      .action-button {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 28px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
      }
      .action-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      }
      .stats {
        display: flex;
        justify-content: space-around;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #e2e8f0;
      }
      .stat-item {
        text-align: center;
      }
      .stat-value {
        font-size: 18px;
        font-weight: 700;
        color: #667eea;
        display: block;
      }
      .stat-label {
        font-size: 11px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: 4px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="header-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <h1>New Contact Message! 🎉</h1>
        <p>Someone just reached out through your portfolio</p>
      </div>

      <!-- Content -->
      <div class="content">
        <div class="badge">New Message</div>

        <!-- Sender Info -->
        <div class="field">
          <div class="label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Sender Details
          </div>
          <div class="value">
            <strong>${name}</strong>
            <br>
            <a href="mailto:${email}" class="email-link">${email}</a>
          </div>
        </div>

        <!-- Message -->
        <div class="field">
          <div class="label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Message Content
          </div>
          <div class="message-box">${message}</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-icon">💼</div>
        <p><strong>Portfolio Contact Form</strong></p>
        <p>Sent from your professional portfolio website</p>
        <p style="margin-top: 12px; font-size: 12px; color: #94a3b8;">
          Received on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
        <a href="mailto:${email}?subject=Re: Your Message" class="action-button">Reply to ${name.split(' ')[0]}</a>
      </div>
    </div>
  </body>
</html>
`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Portfolio" <noreply@example.com>',
      to: process.env.CONTACT_EMAIL || "owner@example.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
