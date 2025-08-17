import { MetadataRoute } from 'next'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

const db = drizzle(client)

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://calculator.startsim.ai'
  
  try {
    // Get all calculators from database
    const dbCalculators = await db.select().from(calculatorsTable)
    
    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/calculators`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ]

    // Calculator pages
    const localCalculators = ['loan'] // Your local calculators
    
    const calculatorPages = [
      ...localCalculators.map(slug => ({
        url: `${baseUrl}/calculators/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...dbCalculators.map(calc => ({
        url: `${baseUrl}/calculators/${calc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: calc.featured ? 0.9 : 0.7,
      }))
    ]

    return [...staticPages, ...calculatorPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Fallback to original static list
    const calculatorPages = [
      'loan',
      'selling-price',
      'conversion-pricing',
      'one-dollar-simulation',
      'text-to-image',
      'life-calculator',
      'unit-value-comparison',
      'churn-rate-calculator',
      'emergency-fund-calculator',
      'budget-calculator-advanced',
      'youtube-ai-summarizer',
      'retirement-savings',
    ].map((slug) => ({
      url: `${baseUrl}/calculators/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/calculators`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      ...calculatorPages
    ]
  }
}
