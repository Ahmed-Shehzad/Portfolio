# Branch Protection Setup Guide

This guide helps you configure GitHub branch protection rules that work optimally with the automated workflows.

## 🛡️ Current Issue Resolution

**Problem:** GitHub workflows were failing with:

```
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: - Changes must be made through a pull request.
remote: - Required status check "GitGuardian Security Checks" is expected.
```

**Solution:** ✅ **FIXED** - Updated CI/CD workflow to create PRs for URL updates instead of direct pushes.

## 🔧 Recommended Branch Protection Settings

### For `main` branch:

1. **Require a pull request before merging** ✅
   - ✅ Require approvals: 0 (for automation PRs)
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ❌ Require review from code owners (optional)

2. **Require status checks to pass before merging** ✅
   - ✅ Require branches to be up to date before merging
   - **Required checks:**
     - `quality` (from CI/CD workflow)
     - `GitGuardian Security Checks` (if enabled)
     - Any other security/quality checks you've configured

3. **Require linear history** ✅ (optional but recommended)

4. **Allow force pushes** ❌

5. **Allow deletions** ❌

## 🤖 Auto-merge Configuration

### Repository Settings:

1. Go to **Settings** → **General** → **Pull Requests**
2. ✅ Enable **"Allow auto-merge"**
3. ✅ Enable **"Automatically delete head branches"**

### Workflow Permissions:

1. Go to **Settings** → **Actions** → **General** → **Workflow permissions**
2. Select **"Read and write permissions"**
3. ✅ Enable **"Allow GitHub Actions to create and approve pull requests"**

## 🔄 How the New Process Works

### Deployment Flow:

1. **Push to main** → CI/CD workflow triggers
2. **Quality checks** → Lint, test, type-check, build
3. **Deploy to Vercel** → Get new deployment URL
4. **Create PR** → Automatic PR with URL updates
5. **Auto-merge** → After status checks pass
6. **Clean up** → Delete branch automatically

### Benefits:

- ✅ Respects branch protection rules
- ✅ Maintains audit trail via PRs
- ✅ All status checks are validated
- ✅ Fully automated process
- ✅ No manual intervention required

## 🚨 Troubleshooting

### If auto-merge doesn't work:

1. Check that **"Allow auto-merge"** is enabled in repository settings
2. Verify workflow has **write permissions** for contents and pull-requests
3. Ensure all required status checks are configured properly
4. Check that the PR has the correct labels: `automated` and `deployment`

### If status checks fail:

1. The **GitGuardian Security Checks** is required but may not be configured
2. **To fix:** Go to Settings → Branches → Edit protection rule → Uncheck GitGuardian if not needed
3. **Or:** Configure GitGuardian integration properly

### Manual merge fallback:

If auto-merge fails, the workflow will create the PR and you can merge it manually:

1. Go to the **Pull Requests** tab
2. Find the PR with title: `chore: update deployment URLs [auto-merge]`
3. Review and merge manually

## 📋 Verification Checklist

After configuring, verify that:

- [ ] Pushes to main trigger CI/CD workflow
- [ ] Quality checks run and pass
- [ ] Deployment succeeds and gets new URL
- [ ] PR is created automatically for URL updates
- [ ] PR merges automatically after status checks
- [ ] Branch is deleted after merge
- [ ] No manual intervention required

## 🔗 Related Workflows

- **CI/CD Pipeline** (`ci-cd.yml`) - Creates the URL update PRs
- **Auto-merge URLs** (`auto-merge-urls.yml`) - Merges the PRs automatically
- **PR Validation** (`pr-validation.yml`) - Validates all PRs including automated ones

---

_This setup ensures complete automation while respecting security best practices._
