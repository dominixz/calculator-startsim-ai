# 🔗 GitHub OAuth Setup Instructions

## What You Need to Do:

### 1. **Update Your .env.local File**
Replace the placeholder values with your actual GitHub OAuth credentials:

```bash
# OAuth Providers - Replace with YOUR actual values
GITHUB_CLIENT_ID=your_actual_client_id_from_github
GITHUB_CLIENT_SECRET=your_actual_client_secret_from_github
```

### 2. **GitHub OAuth App Settings**
Make sure your GitHub OAuth app has these exact settings:

- **Application name**: Calculator Startsim.ai
- **Homepage URL**: `http://localhost:3002`
- **Authorization callback URL**: `http://localhost:3002/api/auth/callback/github`

⚠️ **Important**: Notice the port is `3002` (not 3001) since your app runs on port 3002.

### 3. **Where to Find Your Credentials**
1. Go to: https://github.com/settings/developers
2. Click on your "Calculator Startsim.ai" app
3. Copy the **Client ID** 
4. Generate a new **Client secret** if needed

### 4. **Test the Setup**
1. Save your .env.local file with the real credentials
2. Restart your dev server: `npm run dev`
3. Visit http://localhost:3002
4. Click "Sign in with GitHub"
5. You should be redirected to GitHub for authorization

## ✅ What I've Already Done For You:

- ✅ Generated secure NextAuth secret
- ✅ Updated NEXTAUTH_URL to correct port (3002)
- ✅ Verified NextAuth configuration is correct
- ✅ Confirmed all required dependencies are installed
- ✅ Your authentication flow is ready to work

## 🚀 Once You Add Your Credentials:

Your users will be able to:
- Sign in with GitHub
- Access protected calculators
- See their GitHub profile in the header
- Have their sessions persisted in your database

Just replace the placeholder credentials and you're ready to go! 🎉
