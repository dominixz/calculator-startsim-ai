# Deployment Guide - Calculator Startsim.AI v1.0.0

## Prerequisites
- GitHub account
- Vercel account
- Turso database setup
- GitHub OAuth app configured

## GitHub Setup

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Calculator Startsim.ai v1.0.0"
   ```

2. **Create GitHub Repository:**
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `calculator-startsim-ai`
   - Don't initialize with README (we already have one)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/calculator-startsim-ai.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

1. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

2. **Environment Variables:**
   Set these in Vercel Dashboard → Settings → Environment Variables:
   
   ```
   TURSO_DATABASE_URL=libsql://freestartsimai-dominixz.aws-ap-northeast-1.turso.io
   TURSO_AUTH_TOKEN=your_actual_token_here
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your_nextauth_secret_here
   GITHUB_CLIENT_ID=Ov23li6avX6X8uSYgctQ
   GITHUB_CLIENT_SECRET=your_github_secret_here
   ```

3. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically

## Post-Deployment

1. **Update GitHub OAuth App:**
   - Go to GitHub Developer Settings
   - Update your OAuth app settings:
     - Homepage URL: `https://your-app-name.vercel.app`
     - Callback URL: `https://your-app-name.vercel.app/api/auth/callback/github`

2. **Update NEXTAUTH_URL:**
   - In Vercel environment variables
   - Change from localhost to your actual domain

3. **Test Authentication:**
   - Visit your deployed app
   - Test GitHub login functionality
   - Verify calculator access works

## Database Migration

Your Turso database is already set up and contains all the calculators. No additional migration needed for deployment.

## Custom Domain (Optional)

1. **Add Domain in Vercel:**
   - Go to Settings → Domains
   - Add your custom domain

2. **Update OAuth URLs:**
   - Update GitHub OAuth app with custom domain
   - Update NEXTAUTH_URL environment variable

## Troubleshooting

- **Build Errors:** Check Vercel build logs
- **Auth Issues:** Verify OAuth callback URLs match exactly
- **Database Issues:** Verify Turso credentials are correct
- **Environment Variables:** Ensure all required vars are set

## Security Notes

- Never commit `.env.local` to GitHub
- Use Vercel's environment variables for production
- Rotate secrets regularly
- Use different OAuth apps for development and production

## Version 1.0.0 Release Notes

### 🚀 Production Ready Features
- **11 Professional Calculators** with premium access control
- **GitHub OAuth Authentication** with enhanced logout system
- **SEO Optimization** with Open Graph images and structured data
- **PWA Support** for mobile app-like experience
- **Social Media Integration** with sharing functionality

### 🔧 Technical Specifications
- **Next.js 15.4.5** with App Router and Turbopack
- **TypeScript** throughout the application
- **Turso SQLite** cloud database with global replication
- **Vercel** deployment with optimal performance
- **Mobile-First** responsive design

### 📊 Calculator Categories
- **Financial**: Retirement, emergency fund, budget calculators
- **Business**: Unit comparison, churn rate, pricing tools
- **Productivity**: Text-to-image, YouTube summarizer
- **Educational**: Life calculator, simulation games

### 🎯 Post-Deployment Checklist
- [ ] Verify all 11 calculators are accessible
- [ ] Test GitHub authentication flow
- [ ] Confirm premium calculator access control
- [ ] Validate social media sharing
- [ ] Check mobile responsiveness
- [ ] Test logout confirmation system
- [ ] Verify SEO meta tags and OG images

## Release Management with GitHub CLI

### 🚀 Creating Releases

For future releases, use the GitHub CLI for professional release management:

```bash
# Install GitHub CLI (if not already installed)
brew install gh

# Authenticate with GitHub
gh auth login

# Create a release with comprehensive notes
gh release create v1.1.0 \
  --title "🚀 Calculator Startsim.AI v1.1.0 - Feature Update" \
  --notes-file RELEASE_NOTES_v1.1.0.md \
  --latest \
  --generate-notes
```

### 📋 Release Script Usage

Use the included release script for automated releases:

```bash
# Make the script executable (one time)
chmod +x scripts/release.sh

# Create a new release
./scripts/release.sh v1.1.0 "Feature Update"

# Or use npm scripts
npm run release v1.1.0 "Feature Update"
```

### 🔖 Version Management

The project follows semantic versioning:
- **Patch** (v1.0.1): Bug fixes and minor updates
- **Minor** (v1.1.0): New features and enhancements
- **Major** (v2.0.0): Breaking changes and major rewrites

### 📝 Release Notes Template

Create detailed release notes for each version:
- **Features**: New calculators, UI improvements
- **Technical**: Framework updates, performance improvements
- **Bug Fixes**: Resolved issues and optimizations
- **Security**: Authentication and privacy updates
