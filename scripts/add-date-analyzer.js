const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const { eq } = require('drizzle-orm')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: '.env.local' })

// Define the table schema inline
const { sqliteTable, text, integer } = require('drizzle-orm/sqlite-core')

const calculators = sqliteTable('calculators', {
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

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const db = drizzle(client)

async function addDateAnalyzer() {
  try {
    // Check if calculator already exists
    const existing = await db
      .select()
      .from(calculators)
      .where(eq(calculators.slug, 'date-analyzer'))

    if (existing.length > 0) {
      console.log('Date Analyzer already exists, updating to require auth...')
      await db
        .update(calculators)
        .set({ requiresAuth: true })
        .where(eq(calculators.slug, 'date-analyzer'))
      console.log('✅ Updated Date Analyzer to require authentication')
    } else {
      // Add new Date Analyzer calculator
      await db.insert(calculators).values({
        id: 'date-analyzer-' + Date.now(),
        name: 'Date Explorer & Analyzer',
        description: 'Discover comprehensive temporal information and compare dates with precision. Analyze date patterns, calculate differences, and explore historical data.',
        category: 'productivity',
        slug: 'date-analyzer',
        featured: true,
        externalUrl: 'https://date-analyzer--dominixz.github.app/',
        requiresAuth: true,
        metadata: JSON.stringify({
          keywords: ['date', 'analyzer', 'explorer', 'temporal', 'calendar', 'time', 'comparison', 'calculator']
        })
      })
      console.log('✅ Added Date Explorer & Analyzer as premium calculator (requires login)')
    }

    // List all calculators to verify
    const allCalculators = await db.select().from(calculators)
    console.log('\nAll calculators:')
    allCalculators.forEach(calc => {
      const authStatus = calc.requiresAuth ? '🔒 Premium' : '🌐 Public'
      console.log(`${authStatus} ${calc.name} (${calc.slug})`)
    })

    console.log('\nDate Explorer & Analyzer is now set as premium - users must login with GitHub to access it!')

  } catch (error) {
    console.error('Error:', error)
  }
}

addDateAnalyzer()
