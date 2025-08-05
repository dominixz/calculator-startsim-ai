# Calculator Startsim.AI - Business Calculator Hub

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/dominixz/calculator-startsim-ai)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Private-red.svg)](https://github.com/dominixz/calculator-startsim-ai)

A comprehensive business calculator portal with premium features, GitHub authentication, and modern user experience. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎉 Version 1.0.0 Released!

**Calculator Startsim.AI** is now live with 11 professional calculators, premium access control, and a beautiful modern interface.

## ✨ Key Features

### 🏆 **Premium Calculator Hub**
- **11 Professional Calculators** across multiple categories
- **7 Premium Calculators** with GitHub authentication
- **4 Public Calculators** accessible to everyone
- **Smart Search & Filtering** with real-time results

### 🔐 **Advanced Authentication**
- **GitHub OAuth Integration** for secure access
- **Premium Access Control** for exclusive calculators
- **Enhanced Logout System** with confirmation modals
- **Visual Login Indicators** and welcome messages

### 🎨 **Modern User Experience**
- **Beautiful Gradient Design** with smooth animations
- **Responsive Layout** optimized for all devices
- **Loading States** and progress indicators
- **Toast Notifications** for user feedback
- **Social Media Sharing** integration

### 🚀 **SEO & Performance**
- **Open Graph Tags** for rich social media previews
- **Structured Data** with Schema.org markup
- **Dynamic Metadata** for each calculator
- **PWA Support** with offline capabilities
- **Optimized Performance** with Next.js 15

## 📊 Calculator Portfolio

### 🌐 **Public Calculators** (No Login Required)
- **Selling Price Calculator** - Optimize your pricing strategies
- **Free Conversion & Pricing Calculator** - Unit conversion and pricing tools
- **$1 Simulation Game** - Interactive financial simulation
- **Simple Text to Image Generator** - Basic image generation tool

### 🔒 **Premium Calculators** (GitHub Login Required)
- **Life Calculator** - Life expectancy and planning tools
- **Unit Value Comparison Tool** - Advanced comparison analytics
- **Churn Rate Threshold Calculator** - Business retention metrics
- **Peace of Mind & Emergency Fund Calculator** - Financial security planning
- **Budget Calculator** - Advanced budgeting with scenarios
- **YouTube AI Summarizer** - AI-powered video content analysis
- **เครื่องคำนวณเงินออมเกษียณ** - Thai retirement savings calculator

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15.4.5** with App Router and Turbopack
- **TypeScript** for full type safety
- **Tailwind CSS** with custom design system
- **Lucide React** for consistent iconography
- **React Hooks** for modern state management

### **Backend & Database**
- **Turso SQLite** cloud-native database
- **Drizzle ORM** with type-safe operations
- **NextAuth.js 4.24.11** for GitHub authentication
- **API Routes** for RESTful endpoints

### **Deployment & DevOps**
- **Vercel** for serverless deployment
- **GitHub** for version control and CI/CD
- **Environment Variables** for secure configuration
- **ESLint** for code quality

## 🏃‍♂️ Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- GitHub account (for authentication)
- Turso account (for database)

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/dominixz/calculator-startsim-ai.git
cd calculator-startsim-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configurations:
```env
# Database
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

4. **Set up database**
```bash
npm run db:push
```

5. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

Edit `.env.local` and add your Turso database credentials:
- `TURSO_DATABASE_URL`: Your Turso database URL
- `TURSO_AUTH_TOKEN`: Your Turso authentication token

4. **Set up the database**
```bash
npm run db:generate
npm run db:migrate
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Database Setup

### Using Turso (Recommended)

1. Sign up at [turso.tech](https://turso.tech/)
2. Create a new database
3. Get your database URL and auth token
4. Add them to your `.env.local` file

### Database Commands

- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables in Vercel Dashboard**
   - `TURSO_DATABASE_URL`: `libsql://freestartsimai-dominixz.aws-ap-northeast-1.turso.io`
   - `TURSO_AUTH_TOKEN`: Your Turso auth token
   - `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET`: Generate a secure secret key

4. **Deploy!**
   - Vercel will automatically deploy on every push
   - Your app will be available at `https://your-app.vercel.app`

### Important Notes for Production:
- Database is already set up and configured for SSR
- Environment variables are properly configured
- The app uses server-side rendering for better performance
- All API routes work with Vercel's serverless functions

The app is optimized for Vercel deployment with proper environment variable handling and SSR support.

## 🔧 Development

### Adding New Calculators

1. Create a new component in `src/components/calculators/`
2. Add the calculator to the routes in `src/app/calculators/[slug]/page.tsx`
3. Update the calculator list in `src/app/page.tsx` and `src/app/calculators/page.tsx`

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
│   ├── calculators/     # Calculator components
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── lib/                 # Utilities and database
└── types/               # TypeScript type definitions
```

## 📝 Environment Variables

Required environment variables:

- `TURSO_DATABASE_URL` - Your Turso database URL
- `TURSO_AUTH_TOKEN` - Your Turso authentication token
- `NEXTAUTH_URL` - Your app URL (for production)
- `NEXTAUTH_SECRET` - NextAuth.js secret (for authentication)
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret

## 🚀 Deployment

### Quick Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/calculator-startsim-ai)

### Manual Deployment

1. **Fork/Clone the repository**
2. **Set up environment variables** (see `.env.example`)
3. **Deploy to Vercel** or your preferred platform
4. **Configure GitHub OAuth** with your production URLs

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you need help setting up the project or have questions, please create an issue in the repository.
