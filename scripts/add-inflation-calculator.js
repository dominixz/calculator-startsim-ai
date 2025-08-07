const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const { eq } = require('drizzle-orm')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: '.env.local' })

// Define the table schema inline
const { sqliteTable, text, integer } = require('drizzle-orm/sqlite-core')
const { sql } = require('drizzle-orm')

const calculators = sqliteTable('calculators', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  slug: text('slug').notNull().unique(),
  icon: text('icon'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  externalUrl: text('external_url'),
  requiresAuth: integer('requires_auth', { mode: 'boolean' }).default(false),
  metadata: text('metadata'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
})

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const db = drizzle(client)

async function addInflationCalculator() {
  try {
    console.log('Adding Inflation Impact Calculator to cloud database...')
    
    // Check if calculator already exists
    const existing = await db
      .select()
      .from(calculators)
      .where(eq(calculators.slug, 'inflation-calculator'))

    if (existing.length > 0) {
      console.log('Inflation Calculator already exists, updating to require auth...')
      await db
        .update(calculators)
        .set({ 
          requiresAuth: true,
          name: 'Inflation Impact Calculator',
          description: 'See how inflation affects your everyday spending over time. Add your expenses and discover their future cost. Understand the real impact of inflation on your budget with interactive calculations.',
          externalUrl: 'https://inflation-impact-cal--dominixz.github.app/'
        })
        .where(eq(calculators.slug, 'inflation-calculator'))
      console.log('✅ Updated Inflation Calculator to require authentication')
    } else {
      // Add new Inflation Calculator
      await db.insert(calculators).values({
        id: 'inflation-calculator-' + Date.now(),
        name: 'Inflation Impact Calculator',
        description: 'See how inflation affects your everyday spending over time. Add your expenses and discover their future cost. Understand the real impact of inflation on your budget with interactive calculations.',
        category: 'financial',
        slug: 'inflation-calculator',
        featured: true,
        externalUrl: 'https://inflation-impact-cal--dominixz.github.app/',
        requiresAuth: true,
        metadata: JSON.stringify({
          keywords: ['inflation', 'calculator', 'expenses', 'cost', 'budget', 'financial planning', 'purchasing power', 'economic impact']
        })
      })
      console.log('✅ Added Inflation Impact Calculator as premium calculator (requires login)')
    }

    // List all calculators to verify
    const allCalculators = await db.select().from(calculators)
    console.log(`\n📊 Total calculators in cloud database: ${allCalculators.length}`)
    console.log('\nBreakdown:')
    const premium = allCalculators.filter(c => c.requiresAuth).length
    const public = allCalculators.filter(c => !c.requiresAuth).length
    console.log(`🌐 Public calculators: ${public}`)
    console.log(`🔒 Premium calculators: ${premium}`)

    console.log('\n🎉 Inflation Impact Calculator successfully added as premium calculator!')
    console.log('📈 Users must login with GitHub to access the inflation calculator!')

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

addInflationCalculator()
