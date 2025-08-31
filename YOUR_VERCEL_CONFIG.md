# 🔐 Your Vercel Project Configuration

Based on your linked project, here are your exact values:

## GitHub Secrets to Add

Go to: `https://github.com/Ahmed-Shehzad/Portfolio/settings/secrets/actions`

### 1. VERCEL_ORG_ID

```
team_Yb97nO1eGV7aC2c6McNs2C0q
```

### 2. VERCEL_PROJECT_ID

```
prj_EsDEeC1BzI472MoooRvnCqeL6eDv
```

### 3. VERCEL_TOKEN

**You need to create this manually:**

1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: `GitHub Actions Portfolio`
4. Scope: `Full Account` (or at minimum: deployments, projects)
5. Click "Create"
6. **Copy the token immediately** (you won't see it again)
7. Add it as `VERCEL_TOKEN` in GitHub secrets

## Quick Links

- 🔗 **GitHub Secrets**: https://github.com/Ahmed-Shehzad/Portfolio/settings/secrets/actions
- 🔑 **Create Vercel Token**: https://vercel.com/account/tokens
- 📊 **Vercel Dashboard**: https://vercel.com/muhammad-ahmed-shehzads-projects/portfolio

## Verification Commands

After adding the secrets, you can test the deployment by:

```bash
# Manual workflow trigger
gh workflow run "CI/CD - Vercel Deployment"

# Or push a commit to main branch
git commit --allow-empty -m "test: trigger deployment"
git push origin main
```

## Next Steps

1. ✅ VERCEL_ORG_ID: `team_Yb97nO1eGV7aC2c6McNs2C0q`
2. ✅ VERCEL_PROJECT_ID: `prj_EsDEeC1BzI472MoooRvnCqeL6eDv`
3. ⏳ VERCEL_TOKEN: **Create manually at vercel.com/account/tokens**
4. ⏳ Add all three secrets to GitHub repository settings
5. ⏳ Test deployment by pushing to main or running workflow manually
