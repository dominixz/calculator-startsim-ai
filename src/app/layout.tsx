import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SessionProviderWrapper from "@/components/layout/SessionProviderWrapper";
import { StructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calculator-startsim-ai.vercel.app'),
  title: "Calculator Startsim.AI - Business Calculator Hub | Financial Tools & Premium Calculators",
  description: "Comprehensive business calculator portal with loan, mortgage, investment, retirement, and tax calculators. Calculate everything you need for your business and personal finance planning. Premium calculators available with GitHub login.",
  keywords: [
    "calculator",
    "business calculator",
    "financial calculator",
    "loan calculator",
    "mortgage calculator",
    "investment calculator",
    "retirement planning",
    "tax calculator",
    "budget calculator",
    "startsim.ai",
    "financial tools",
    "premium calculators"
  ],
  authors: [{ name: "Startsim.AI" }],
  creator: "Startsim.AI",
  publisher: "Startsim.AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calculator-startsim-ai.vercel.app',
    siteName: 'Calculator Startsim.AI',
    title: 'Calculator Startsim.AI - Business Calculator Hub',
    description: 'Comprehensive business calculator portal with loan, mortgage, investment, retirement, and tax calculators. Premium calculators available with GitHub login.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Calculator Startsim.AI - Business Calculator Hub',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator Startsim.AI - Business Calculator Hub',
    description: 'Comprehensive business calculator portal with premium financial tools. Login with GitHub for exclusive calculators.',
    images: ['/api/og'],
    creator: '@startsim_ai',
    site: '@startsim_ai',
  },
  facebook: {
    appId: '1234567890', // You can add your Facebook App ID if you have one
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    yandex: 'your-yandex-verification-code', // Add if you want Yandex verification
    yahoo: 'your-yahoo-verification-code', // Add if you want Yahoo verification
  },
  alternates: {
    canonical: 'https://calculator-startsim-ai.vercel.app',
  },
  category: 'finance',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <link rel="canonical" href="https://calculator-startsim-ai.vercel.app" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Calculator Startsim.AI" />
        <link rel="apple-touch-icon" href="/api/og" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Calculator Startsim.AI" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionProviderWrapper>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
