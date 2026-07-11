import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// SMTP needs the full Node.js runtime, and the two sequential sends must not
// be cut off by the default serverless duration.
export const runtime = "nodejs";
export const maxDuration = 30;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactSubmissionResult {
  success: boolean;
  message: string;
  data?: ContactFormData;
}

// Email validation regex (same as frontend for consistency)
const SAFE_EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;

// Validation function
const validateContactForm = (data: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name?.trim() || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!data.email?.trim() || !SAFE_EMAIL_REGEX.test(data.email.trim())) {
    errors.push("Please provide a valid email address");
  }

  if (!data.subject?.trim() || data.subject.trim().length < 3) {
    errors.push("Subject must be at least 3 characters long");
  }

  if (!data.message?.trim() || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env["SMTP_HOST"] || "smtp.gmail.com",
    port: parseInt(process.env["SMTP_PORT"] || "587"),
    secure: process.env["SMTP_SECURE"] === "true", // true for 465, false for other ports
    auth: {
      user: process.env["SMTP_USER"],
      pass: process.env["SMTP_PASS"],
    },
    // Fail fast instead of hanging into the serverless function timeout.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
};

// Escape user-provided text before interpolating it into email HTML.
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* ---------------------------------------------------------------------------
 * Liquid Glass email templates — mirrors the site's design system:
 * pastel lavender/pink/ice-blue backdrop, milky glass cards with bright rims
 * and rounded corners, slate-blue ink text, violet jelly accents.
 * Email clients don't support backdrop-filter, so the glass reads through
 * translucent white fills over the pastel gradient plus bright borders.
 * ------------------------------------------------------------------------- */
const glass = {
  // Pastel liquid backdrop (solid fallback first for clients without gradients)
  body: "margin:0;padding:32px 12px;background-color:#e9e2f6;background-image:linear-gradient(160deg,#f6e8f7 0%,#e7dff7 40%,#d9e6f8 100%);font-family:Arial,Helvetica,sans-serif;",
  // Milky glass card (solid fallback, then translucent white where supported)
  card: "max-width:600px;margin:0 auto;background-color:#f6f3fc;background-color:rgba(255,255,255,0.58);border:1px solid rgba(255,255,255,0.9);border-radius:24px;box-shadow:0 24px 48px -20px rgba(97,94,166,0.4);overflow:hidden;",
  inner: "padding:28px;",
  // Inner glass tiles
  tile: "background-color:#faf8fe;background-color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.95);border-radius:16px;padding:18px 20px;margin:16px 0;",
  // Violet jelly pill (like the site's accent buttons)
  pill: "display:inline-block;background-color:#8b5cf6;background-image:linear-gradient(135deg,#c1abfa 0%,#8b5cf6 100%);color:#ffffff;border-radius:999px;padding:10px 22px;font-size:15px;font-weight:bold;border:1px solid rgba(255,255,255,0.7);",
  ink: "color:#33517a;",
  inkSoft: "color:#5f7396;",
  inkFaint: "color:#8494b3;",
  hr: "border:none;border-top:1px solid rgba(255,255,255,0.95);margin:0;",
  footer: "padding:18px 28px 26px;font-size:12px;color:#8494b3;text-align:center;line-height:1.6;",
};

const notificationHtml = (formData: ContactFormData): string => {
  const name = escapeHtml(formData.name);
  const email = escapeHtml(formData.email);
  const subject = escapeHtml(formData.subject);
  const message = escapeHtml(formData.message).replace(/\n/g, "<br>");
  return `
    <body style="${glass.body}">
      <div style="${glass.card}">
        <div style="${glass.inner}">
          <div style="text-align:center;margin-bottom:8px;">
            <span style="${glass.pill}">New contact request</span>
          </div>
          <h2 style="${glass.ink}font-size:22px;text-align:center;margin:14px 0 4px;">${subject}</h2>
          <p style="${glass.inkFaint}font-size:13px;text-align:center;margin:0 0 18px;">via the portfolio contact form</p>

          <div style="${glass.tile}">
            <p style="${glass.inkSoft}margin:4px 0;font-size:14px;"><strong style="${glass.ink}">Name</strong> &nbsp;${name}</p>
            <p style="${glass.inkSoft}margin:4px 0;font-size:14px;"><strong style="${glass.ink}">Email</strong> &nbsp;<a href="mailto:${email}" style="color:#8b5cf6;text-decoration:none;">${email}</a></p>
          </div>

          <div style="${glass.tile}">
            <p style="${glass.ink}margin:0 0 8px;font-size:14px;font-weight:bold;">Message</p>
            <p style="${glass.inkSoft}margin:0;font-size:14px;line-height:1.7;">${message}</p>
          </div>
        </div>
        <hr style="${glass.hr}">
        <div style="${glass.footer}">
          Reply directly to this email to respond to ${name}.
        </div>
      </div>
    </body>
  `;
};

const confirmationHtml = (formData: ContactFormData): string => {
  const name = escapeHtml(formData.name);
  const subject = escapeHtml(formData.subject);
  const preview = escapeHtml(
    formData.message.length > 150 ? `${formData.message.substring(0, 150)}...` : formData.message
  ).replace(/\n/g, "<br>");
  return `
    <body style="${glass.body}">
      <div style="${glass.card}">
        <div style="${glass.inner}">
          <div style="text-align:center;margin-bottom:8px;">
            <span style="${glass.pill}">&#128075; Message received</span>
          </div>
          <h2 style="${glass.ink}font-size:22px;text-align:center;margin:14px 0 18px;">Thank you for reaching out!</h2>

          <div style="${glass.tile}">
            <p style="${glass.inkSoft}margin:0;font-size:14px;line-height:1.7;">
              Hi <strong style="${glass.ink}">${name}</strong>,<br><br>
              Thank you for contacting me through my portfolio! I've received your message about
              &ldquo;<strong style="${glass.ink}">${subject}</strong>&rdquo; and I appreciate you taking the time to reach out.
            </p>
          </div>

          <div style="${glass.tile}">
            <p style="${glass.ink}margin:0 0 8px;font-size:14px;font-weight:bold;">What happens next?</p>
            <p style="${glass.inkSoft}margin:0;font-size:14px;line-height:1.8;">
              &#10022; I typically respond within 24&ndash;48 hours<br>
              &#10022; I'll review your message carefully and reply thoughtfully<br>
              &#10022; If it's urgent, feel free to mention that in a follow-up
            </p>
          </div>

          <div style="${glass.tile}">
            <p style="${glass.ink}margin:0 0 8px;font-size:14px;font-weight:bold;">Your message summary</p>
            <p style="${glass.inkSoft}margin:0 0 10px;font-size:13px;"><strong style="${glass.ink}">Subject</strong> &nbsp;${subject}</p>
            <p style="${glass.inkFaint}margin:0;font-size:13px;font-style:italic;line-height:1.6;">&ldquo;${preview}&rdquo;</p>
          </div>

          <div style="text-align:center;margin:22px 0 6px;">
            <a href="https://portfolio-azure-five-75.vercel.app/en" style="${glass.pill}text-decoration:none;">Explore my latest work</a>
          </div>
        </div>
        <hr style="${glass.hr}">
        <div style="${glass.footer}">
          This is an automated confirmation from Muhammad Ahmed Shehzad's portfolio.<br>
          Please don't reply to this email &mdash; I'll respond to your original message directly.
        </div>
      </div>
    </body>
  `;
};

// Send email function
const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  const transporter = createTransporter();

  // Email to you (the recipient)
  const notificationEmail = {
    from: `"${formData.name}" <${process.env["SMTP_USER"]}>`, // sender address
    to: process.env["CONTACT_EMAIL"] || process.env["SMTP_USER"], // your email address
    subject: `Portfolio Contact: ${formData.subject}`,
    html: notificationHtml(formData),
    replyTo: formData.email, // Set reply-to as the user's email
  };

  // Confirmation email to the sender
  const confirmationEmail = {
    from: `"Muhammad Ahmed Shehzad" <${process.env["SMTP_USER"]}>`,
    to: formData.email,
    subject: `Thank you for reaching out - Message received`,
    html: confirmationHtml(formData),
  };

  // The notification to me is the one that must succeed; the confirmation
  // to the sender is best-effort — a bad recipient address must not make
  // the whole submission report failure after my copy already went out.
  await transporter.sendMail(notificationEmail);
  try {
    await transporter.sendMail(confirmationEmail);
  } catch (confirmationError) {
    console.error("Confirmation email failed (notification was sent):", confirmationError);
  }
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
): Promise<NextResponse<ContactSubmissionResult>> {
  try {
    // Extract locale from URL parameters
    const { locale } = await params;

    // Parse request body
    const body: ContactFormData = await request.json();

    // Log the contact form submission with locale information
    console.warn(`Contact form submission from locale: ${locale}`, {
      locale,
      hasName: !!body.name,
      hasEmail: !!body.email,
      hasSubject: !!body.subject,
      hasMessage: !!body.message,
      timestamp: new Date().toISOString(),
    });

    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      console.warn(`Validation failed for locale ${locale}:`, validation.errors);
      return NextResponse.json(
        {
          success: false,
          message: `Validation failed: ${validation.errors.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!process.env["SMTP_USER"] || !process.env["SMTP_PASS"]) {
      console.error("SMTP credentials not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Email service not configured. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Send email
    await sendContactEmail(body);

    // Log successful submission
    console.warn(`Contact form successfully submitted from locale: ${locale}`, {
      locale,
      name: body.name,
      email: body.email,
      subject: body.subject,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
      data: body,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    // Surface the SMTP failure class (EAUTH, ESOCKET, ETIMEDOUT, ...) —
    // never the message, which could carry sensitive detail. This is what
    // lets us tell a revoked app password apart from a blocked connection
    // without access to the server logs.
    const errorCode =
      error && typeof error === "object" && "code" in error ? String(error.code) : "UNKNOWN";

    return NextResponse.json(
      {
        success: false,
        message: `Sorry, there was an error sending your message. Please try again later. (${errorCode})`,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}
