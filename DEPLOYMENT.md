# Deployment Guide

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
   git commit -m "Initial commit: Calculator Startsim.ai"
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
