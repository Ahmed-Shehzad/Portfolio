# Contact Form Email Setup Guide

## Overview

The contact form now supports sending actual emails when users submit the form. This guide explains how to configure email sending functionality for your portfolio.

## Features Implemented

### ✅ **Email Sending Functionality**

- **Real API Endpoint**: `/api/contact` that actually sends emails
- **Email Validation**: Server-side validation matching frontend validation
- **Professional Email Format**: Well-formatted HTML emails with your branding
- **Reply-To Support**: Recipients can reply directly to the sender's email
- **Error Handling**: Comprehensive error handling with user-friendly messages

### ✅ **Email Template**

The email you receive includes:

- **Contact Details**: Name, email, and subject from the form
- **Formatted Message**: Clean HTML formatting with line breaks preserved
- **Professional Styling**: Branded email template with your color scheme
- **Reply Functionality**: Set up to allow direct replies to the sender

## Setup Instructions

### 1. **Install Dependencies**

Dependencies are already installed:

```bash
npm install nodemailer @types/nodemailer
```

### 2. **Configure Environment Variables**

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and configure your email settings:

#### For Gmail (Recommended):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

#### For Other Providers:

- **Outlook**: `smtp.office365.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- **Custom SMTP**: Use your provider's settings

### 3. **Gmail App Password Setup** (If using Gmail)

Gmail requires an "App Password" for third-party applications:

1. **Enable 2-Factor Authentication**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app
   - Copy the generated 16-character password
   - Use this as your `SMTP_PASS` (not your regular Gmail password)

3. **Configure Environment Variables**:
   ```bash
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcd-efgh-ijkl-mnop  # 16-character app password
   CONTACT_EMAIL=your-email@gmail.com
   ```

### 4. **Test the Implementation**

1. **Start Development Server**:

   ```bash
   npm run dev
   ```

2. **Test Contact Form**:
   - Navigate to your portfolio
   - Open the contact modal
   - Fill out and submit the form
   - Check your email for the submission

## Technical Implementation

### **API Endpoint**: `/src/app/[locale]/api/contact/route.ts`

- **Method**: POST
- **Validation**: Server-side form validation
- **Email Sending**: Nodemailer with HTML templates
- **Error Handling**: Comprehensive error responses

### **Frontend Integration**: Updated in existing files

- **Contact API**: `/src/lib/api/contact.ts` - Now calls real endpoint
- **React Query Hook**: `/src/features/contact/hooks/useContactQuery.ts` - Uses actual API
- **Contact Modal**: No changes needed - already set up correctly

### **Email Template Features**

- Professional HTML formatting
- Responsive design for mobile email clients
- Branded color scheme (emerald/sky gradient)
- Clear contact information display
- Formatted message content with line break preservation
- Reply-to functionality for direct responses

## Security Features

### ✅ **Input Validation**

- Server-side validation matching frontend rules
- Email regex validation to prevent injection
- Required field validation
- Length limits on all fields

### ✅ **Environment Security**

- Sensitive credentials stored in environment variables
- No hardcoded email credentials in code
- Proper error handling without exposing internals

### ✅ **Rate Limiting** (Recommended for Production)

For production deployment, consider adding rate limiting:

```typescript
// Example: Add to API route
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});
```

## Error Handling

### **Client-Side Errors**

- Form validation errors shown inline
- Network errors with user-friendly messages
- Loading states during submission

### **Server-Side Errors**

- SMTP configuration errors (logs to console)
- Email sending failures (graceful fallback)
- Invalid form data (400 Bad Request)
- Server errors (500 Internal Server Error)

## Production Deployment

### **Environment Variables for Production**

Set these in your hosting platform (Vercel, Netlify, etc.):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-production-email@gmail.com
SMTP_PASS=your-production-app-password
CONTACT_EMAIL=your-production-email@gmail.com
```

### **Vercel Deployment**

Add environment variables in Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all SMTP\_\* and CONTACT_EMAIL variables
4. Redeploy your application

## Troubleshooting

### **Common Issues**

1. **"Email service not configured"**
   - Ensure `SMTP_USER` and `SMTP_PASS` are set in `.env.local`
   - Restart your development server after adding variables

2. **"Authentication failed"**
   - For Gmail: Use App Password, not regular password
   - Enable 2-Factor Authentication first
   - Check that credentials are correct

3. **"Connection timeout"**
   - Check SMTP host and port settings
   - Verify firewall/network settings
   - Try different SMTP ports (587, 465, 25)

4. **Emails not received**
   - Check spam/junk folder
   - Verify `CONTACT_EMAIL` is correct
   - Test with a different email provider

### **Testing in Development**

- Use [MailHog](https://github.com/mailhog/MailHog) for local email testing
- Use [Mailtrap](https://mailtrap.io/) for safe email testing
- Enable console logging to debug SMTP issues

## Email Template Customization

The email template can be customized in `/src/app/[locale]/api/contact/route.ts`:

```typescript
const mailOptions = {
  from: `"${formData.name}" <${process.env.SMTP_USER}>`,
  to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
  subject: `Portfolio Contact: ${formData.subject}`,
  html: `
    <!-- Your custom HTML template here -->
  `,
  replyTo: formData.email,
};
```

## Summary

Your contact form now:

- ✅ Sends real emails to your specified address
- ✅ Uses professional HTML email formatting
- ✅ Includes comprehensive error handling
- ✅ Supports direct replies to the sender
- ✅ Works with Gmail, Outlook, Yahoo, and custom SMTP
- ✅ Is production-ready with proper security measures

Simply configure your email credentials in `.env.local` and your contact form will start sending actual emails!
