# Vercel Secrets Setup Guide

## Required GitHub Secrets

Your GitHub Actions workflow requires these secrets to deploy to Vercel:

### 1. VERCEL_TOKEN

**What it is:** Your personal Vercel API token for authentication

**How to get it:**

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it something like "GitHub Actions Portfolio"
4. Select appropriate scope (usually "Full Account")
5. Copy the generated token

### 2. VERCEL_ORG_ID

**What it is:** Your Vercel organization/team ID

**How to get it:**

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile/team name in the top left
3. Go to "Settings"
4. Copy the "Team ID" or "User ID" from the General tab

**Alternative method:**

```bash
npx vercel whoami
```

### 3. VERCEL_PROJECT_ID

**What it is:** The unique ID of your portfolio project

**How to get it:**

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your portfolio project
3. Go to "Settings" tab
4. Copy the "Project ID" from the General section

**Alternative method:**

```bash
# In your project directory
npx vercel link
# This will create .vercel/project.json with the project ID
```

## Setting Up GitHub Secrets

1. Go to your GitHub repository: `https://github.com/Ahmed-Shehzad/Portfolio`
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret:
   - Name: `VERCEL_TOKEN`, Value: [your token]
   - Name: `VERCEL_ORG_ID`, Value: [your org/user ID]
   - Name: `VERCEL_PROJECT_ID`, Value: [your project ID]

## Verification

After adding the secrets, you can trigger a deployment by:

1. Making a commit to the `main` branch, or
2. Going to Actions tab → "CI/CD - Vercel Deployment" → "Run workflow"

## Security Notes

- Never commit these values to your repository
- Tokens have expiration dates - check and rotate them periodically
- Use minimum required permissions for tokens
- Consider using environment-specific tokens if you have multiple stages

## Troubleshooting

If you still get errors after adding secrets:

1. Verify secret names match exactly (case-sensitive)
2. Check that the Vercel project exists and you have access
3. Ensure the token has sufficient permissions
4. Try re-generating the token if it's old

## Quick Setup Commands

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login and link project
vercel login
vercel link

# Get your team/user info
vercel whoami

# Check project settings
vercel project ls
```
