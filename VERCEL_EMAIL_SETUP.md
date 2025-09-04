# 📧 Vercel Email Configuration Guide

## ✅ Repository Secrets Created

Your GitHub repository now has the following secrets configured:

- `SMTP_USER` - Your Gmail address
- `SMTP_PASS` - Your Gmail app password
- `CONTACT_EMAIL` - Email where contact forms will be sent
- `SMTP_HOST` - Gmail SMTP server
- `SMTP_PORT` - SMTP port number

## 🚀 Next Steps: Configure Vercel Environment Variables

### Option 1: Automatic Sync (Recommended)

Vercel can automatically sync your GitHub repository secrets:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add"** and select **"Import from GitHub"**
5. Select the secrets you want to import:
   - ✅ `SMTP_USER`
   - ✅ `SMTP_PASS`
   - ✅ `CONTACT_EMAIL`
   - ✅ `SMTP_HOST`
   - ✅ `SMTP_PORT`

### Option 2: Manual Configuration

If automatic sync isn't available, add each environment variable manually:

1. Go to **Settings** → **Environment Variables**
2. For each variable, click **"Add"**:

   **SMTP_HOST**
   - Value: `smtp.gmail.com`
   - Environment: Production, Preview, Development

   **SMTP_PORT**
   - Value: `587`
   - Environment: Production, Preview, Development

   **SMTP_USER**
   - Value: Your Gmail address
   - Environment: Production, Preview, Development

   **SMTP_PASS**
   - Value: Your Gmail app password
   - Environment: Production, Preview, Development

   **CONTACT_EMAIL**
   - Value: Your Gmail address
   - Environment: Production, Preview, Development

## 🔧 Deployment Configuration

### Vercel Build Settings

Your `vercel.json` is already configured correctly. The email API will work automatically once environment variables are set.

### API Route Configuration

Your contact form API route is located at:

```
src/app/[locale]/api/contact/route.ts
```

This route automatically uses the environment variables you've configured.

## 🧪 Testing Your Setup

### 1. Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000 and test the contact form

### 2. Test on Vercel Preview

- Push changes to a branch
- Vercel will create a preview deployment
- Test the contact form on the preview URL

### 3. Test in Production

- Merge to main branch
- Production deployment will have email functionality

## ✅ Verification Checklist

- [ ] GitHub repository secrets created
- [ ] Vercel environment variables configured
- [ ] Local development works (npm run dev)
- [ ] Preview deployment works
- [ ] Production deployment works
- [ ] Email delivery confirmed

## 🚨 Troubleshooting

### Common Issues:

1. **"Unauthorized" Error**
   - Check Gmail app password is correct
   - Ensure 2FA is enabled on Gmail account

2. **"Connection Refused" Error**
   - Verify SMTP_HOST and SMTP_PORT values
   - Check if Gmail SMTP is accessible

3. **Email Not Received**
   - Check spam/junk folder
   - Verify CONTACT_EMAIL is correct
   - Test with different recipient

### Debug Mode:

Add this to your Vercel environment variables for debugging:

```
DEBUG=true
```

## 📚 Related Documentation

- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**🎉 Your email functionality is now ready for production!**
