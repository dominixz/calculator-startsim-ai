# Calculator Startsim.ai - Business Calculator Hub

A comprehensive business calculator portal built with Next.js, TypeScript, and Tailwind CSS. Similar to calculator.net but focused on business and financial calculations.

## 🚀 Features

- **Comprehensive Calculators**: Loan, mortgage, investment, tax, and business calculators
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **User Authentication**: Save and track your calculations (coming soon)
- **Database Integration**: Turso (SQLite) for user data and calculation history
- **Modern UI**: Clean and intuitive interface with Tailwind CSS
- **SEO Optimized**: Built with Next.js App Router for better performance

## 📊 Available Calculators

- **Loan Calculator**: Monthly payments, amortization schedules, total interest
- **Mortgage Calculator**: Home loan calculations with different terms
- **Investment Calculator**: Compound interest and growth projections
- **Tax Calculator**: Federal and state tax estimates
- **Credit Card Calculator**: Payoff time and interest calculations
- **Business Calculator**: ROI, break-even analysis, and more

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Turso (SQLite) with Drizzle ORM
- **Authentication**: NextAuth.js (planned)
- **Deployment**: Vercel-ready
- **Icons**: Lucide React

## 🏃‍♂️ Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd calculator_startsim_ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

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
