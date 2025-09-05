import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
  });
};

// Send email function
const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  const transporter = createTransporter();

  // Email to you (the recipient)
  const notificationEmail = {
    from: `"${formData.name}" <${process.env["SMTP_USER"]}>`, // sender address
    to: process.env["CONTACT_EMAIL"] || process.env["SMTP_USER"], // your email address
    subject: `Portfolio Contact: ${formData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
        </div>

        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0891b2; margin: 20px 0;">
          <h3 style="color: #0891b2; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; color: #374151;">${formData.message.replace(/\n/g, "<br>")}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>This email was sent from your portfolio contact form.</p>
          <p>Reply directly to this email to respond to ${formData.name}.</p>
        </div>
      </div>
    `,
    replyTo: formData.email, // Set reply-to as the user's email
  };

  // Confirmation email to the sender
  const confirmationEmail = {
    from: `"Muhammad Ahmed Shehzad" <${process.env["SMTP_USER"]}>`,
    to: formData.email,
    subject: `Thank you for reaching out - Message received`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
          Thank You for Your Message!
        </h2>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
          <p style="margin: 0; font-size: 16px; color: #374151;">
            Hi <strong>${formData.name}</strong>,
          </p>
          <br>
          <p style="margin: 0; line-height: 1.6; color: #374151;">
            Thank you for reaching out through my portfolio! I've successfully received your message about
            "<strong>${formData.subject}</strong>" and I appreciate you taking the time to contact me.
          </p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0891b2; margin-top: 0;">What happens next?</h3>
          <ul style="color: #374151; line-height: 1.6; padding-left: 20px;">
            <li>I typically respond to messages within 24-48 hours</li>
            <li>I'll review your message carefully and provide a thoughtful response</li>
            <li>If your inquiry is urgent, feel free to mention that in a follow-up</li>
          </ul>
        </div>

        <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
          <h3 style="color: #374151; margin-top: 0;">Your message summary:</h3>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${formData.subject}</p>
          <p style="margin: 5px 0;"><strong>Sent:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <div style="margin-top: 15px; padding: 15px; background-color: #f9fafb; border-radius: 6px;">
            <p style="margin: 0; color: #6b7280; font-style: italic;">
              "${formData.message.length > 150 ? `${formData.message.substring(0, 150)}...` : formData.message}"
            </p>
          </div>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: #0891b2; border-radius: 8px; text-align: center;">
          <h3 style="color: white; margin: 0 0 10px 0;">Let's Connect</h3>
          <p style="color: #e0f2fe; margin: 0; line-height: 1.5;">
            While you wait for my response, feel free to check out my latest projects
            or connect with me on LinkedIn for more immediate updates.
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center;">
          <p>This is an automated confirmation email from Muhammad Ahmed Shehzad's portfolio.</p>
          <p>Please do not reply to this email. I will respond to your original message directly.</p>
        </div>
      </div>
    `,
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(notificationEmail),
    transporter.sendMail(confirmationEmail),
  ]);
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

    return NextResponse.json(
      {
        success: false,
        message: "Sorry, there was an error sending your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}
