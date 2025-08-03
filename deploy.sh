#!/bin/bash

echo "🚀 Calculator Startsim.ai Deployment Script"
echo "========================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "feat: Complete Calculator Startsim.ai setup with authentication

- Added 10 business calculators (4 public, 6 premium)
- Implemented GitHub OAuth authentication
- Added premium access control
- Created beautiful UI with Tailwind CSS
- Set up Turso database integration
- Added deployment configuration
- Updated branding to Calculator Startsim.ai"

echo ""
echo "✅ Local commit completed!"
echo ""
echo "🔗 Next steps for GitHub and Vercel deployment:"
echo ""
echo "1. Create GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: calculator-startsim-ai"
echo "   - Keep it public"
echo "   - Don't initialize with README"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/calculator-startsim-ai.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "4. Update GitHub OAuth:"
echo "   - Update callback URLs in GitHub Developer Settings"
echo "   - Use your Vercel domain instead of localhost"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
