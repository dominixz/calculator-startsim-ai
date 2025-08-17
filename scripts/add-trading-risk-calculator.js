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

async function addTradingRiskCalculator() {
  try {
    // Check if calculator already exists
    const existing = await db
      .select()
      .from(calculators)
      .where(eq(calculators.slug, 'trading-risk-calculator'))

    if (existing.length > 0) {
      console.log('Trading Risk Calculator already exists, updating...')
      await db
        .update(calculators)
        .set({ 
          requiresAuth: true,
          name: 'Risk & Reward Trading Calculator',
          description: 'Professional trading tools for position sizing and risk management. Features Kelly Criterion Calculator for optimal bet sizing, risk-reward analysis, and simulation runs to maximize trading performance.',
          externalUrl: 'https://trading-risk-calcula--dominixz.github.app/'
        })
        .where(eq(calculators.slug, 'trading-risk-calculator'))
      console.log('✅ Updated Trading Risk Calculator to require authentication')
    } else {
      // Add new Trading Risk Calculator
      await db.insert(calculators).values({
        id: 'trading-risk-calculator-' + Date.now(),
        name: 'Risk & Reward Trading Calculator',
        description: 'Professional trading tools for position sizing and risk management. Features Kelly Criterion Calculator for optimal bet sizing, risk-reward analysis, and simulation runs to maximize trading performance.',
        category: 'finance',
        slug: 'trading-risk-calculator',
        featured: true,
        externalUrl: 'https://trading-risk-calcula--dominixz.github.app/',
        requiresAuth: true,
        metadata: JSON.stringify({
          keywords: ['trading', 'risk', 'reward', 'kelly criterion', 'position sizing', 'finance', 'investment', 'calculator', 'simulation', 'risk management']
        })
      })
      console.log('✅ Added Risk & Reward Trading Calculator as premium calculator')
    }

    // List all calculators to verify
    const allCalculators = await db.select().from(calculators)
    console.log('\nAll calculators:')
    allCalculators.forEach(calc => {
      const authStatus = calc.requiresAuth ? '🔒 Premium' : '🌐 Public'
      console.log(`${authStatus} ${calc.name} (${calc.slug})`)
    })

    console.log('\n🎉 Trading Risk Calculator ready! Users must login to access it.')

  } catch (error) {
    console.error('Error:', error)
  }
}

addTradingRiskCalculator()
