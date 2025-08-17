import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LoanCalculator } from '@/components/calculators/LoanCalculator'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// Database setup
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

const db = drizzle(client)

// Database schema
const calculatorsTable = sqliteTable('calculators', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  slug: text('slug').notNull().unique(),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  externalUrl: text('external_url'),
  requiresAuth: integer('requires_auth', { mode: 'boolean' }).notNull().default(false),
  metadata: text('metadata'),
})

const calculators = {
  'loan': {
    component: LoanCalculator,
    title: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and amortization schedules for any loan.',
    keywords: ['loan calculator', 'monthly payment', 'interest calculator', 'amortization', 'finance']
  },
  // Add more calculators here as they are created
}

async function getCalculatorFromDB(slug: string) {
  try {
    const result = await db
      .select()
      .from(calculatorsTable)
      .where(eq(calculatorsTable.slug, slug))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error('Error fetching calculator:', error)
    return null
  }
}

async function getAllCalculatorsFromDB() {
  try {
    const result = await db.select().from(calculatorsTable)
    return result
  } catch (error) {
    console.error('Error fetching all calculators:', error)
    return []
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  // Check local calculators first
  const calculator = calculators[slug as keyof typeof calculators]
  if (calculator) {
    return {
      title: `${calculator.title} - Calculator Startsim.AI`,
      description: calculator.description,
      keywords: calculator.keywords,
      openGraph: {
        title: `${calculator.title} - Calculator Startsim.AI`,
        description: calculator.description,
        images: ['/api/og'],
        url: `https://calculator.startsim.ai/calculators/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${calculator.title} - Calculator Startsim.AI`,
        description: calculator.description,
        images: ['/api/og'],
      },
      alternates: {
        canonical: `https://calculator.startsim.ai/calculators/${slug}`,
      },
    }
  }

  // Check Turso database calculators
  const dbCalculator = await getCalculatorFromDB(slug)
  if (dbCalculator) {
    const keywords = dbCalculator.metadata ? 
      JSON.parse(dbCalculator.metadata).keywords || [] : []

    return {
      title: `${dbCalculator.name} - Calculator Startsim.AI`,
      description: dbCalculator.description || `${dbCalculator.name} calculator`,
      keywords: keywords,
      openGraph: {
        title: `${dbCalculator.name} - Calculator Startsim.AI`,
        description: dbCalculator.description || `${dbCalculator.name} calculator`,
        images: ['/api/og'],
        url: `https://calculator.startsim.ai/calculators/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${dbCalculator.name} - Calculator Startsim.AI`,
        description: dbCalculator.description || `${dbCalculator.name} calculator`,
        images: ['/api/og'],
      },
      alternates: {
        canonical: `https://calculator.startsim.ai/calculators/${slug}`,
      },
    }
  }

  return {
    title: 'Calculator Not Found - Calculator Startsim.AI',
    description: 'The requested calculator was not found.'
  }
}

export default async function CalculatorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const session = await getServerSession(authOptions)
  
  // Handle local calculators first
  const calculator = calculators[slug as keyof typeof calculators]
  if (calculator) {
    const CalculatorComponent = calculator.component
    return (
      <div className="container mx-auto px-4 py-8">
        <CalculatorComponent />
      </div>
    )
  }

  // Handle Turso database calculators
  const dbCalculator = await getCalculatorFromDB(slug)
  if (!dbCalculator) {
    notFound()
  }

  // Check authentication requirement
  if (dbCalculator.requiresAuth && !session) {
    const keywords = dbCalculator.metadata ? 
      JSON.parse(dbCalculator.metadata).keywords || [] : []
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {dbCalculator.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {dbCalculator.description}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🔒 Premium Calculator - Login Required
            </h3>
            <p className="text-blue-700 mb-4">
              This professional calculator requires authentication to access.
            </p>
            <a 
              href="/api/auth/signin"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In with GitHub
            </a>
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {keywords.slice(0, 5).map((keyword: string, index: number) => (
                <li key={index}>{keyword.charAt(0).toUpperCase() + keyword.slice(1)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to external calculator if authenticated
  if (dbCalculator.externalUrl) {
    redirect(dbCalculator.externalUrl)
  }

  // Fallback
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {dbCalculator.name}
        </h1>
        <p className="text-gray-600">
          This calculator is being prepared. Please check back soon!
        </p>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    // Get all calculators from Turso database
    const dbCalculators = await getAllCalculatorsFromDB()
    const dbParams = dbCalculators.map(calc => ({ slug: calc.slug }))
    
    // Get local calculator params
    const localParams = Object.keys(calculators).map((slug) => ({ slug }))
    
    // Combine both for static generation
    return [...localParams, ...dbParams]
  } catch (error) {
    console.error('Error generating static params:', error)
    // Fallback to local calculators only
    return Object.keys(calculators).map((slug) => ({ slug }))
  }
}
