# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Business Calculator Portal built with Next.js, TypeScript, and Tailwind CSS. The application serves as a comprehensive collection of business calculators similar to calculator.net.

## Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Turso (SQLite) with Drizzle ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Key Features
- Multiple business calculators (loan, tax, investment, etc.)
- User authentication and profiles
- Calculator history and saved calculations
- Responsive design
- SEO optimized

## Code Guidelines
- Use TypeScript for all components and utilities
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling with consistent design system
- Implement proper error handling and loading states
- Write reusable calculator components
- Use Drizzle ORM for database operations
- Follow NextAuth.js patterns for authentication

## Database
- Use Turso for cloud SQLite database
- Implement proper migrations with Drizzle Kit
- Store user data, calculator history, and preferences

## Deployment
- Optimized for Vercel deployment
- Environment variables configured for production
- Database connection via Turso cloud service
