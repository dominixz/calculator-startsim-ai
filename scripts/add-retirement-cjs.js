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

async function addRetirementCalculator() {
  try {
    // Check if calculator already exists
    const existing = await db
      .select()
      .from(calculators)
      .where(eq(calculators.slug, 'retirement-savings'))

    if (existing.length > 0) {
      console.log('Retirement calculator already exists, updating to require auth...')
      await db
        .update(calculators)
        .set({ requiresAuth: true })
        .where(eq(calculators.slug, 'retirement-savings'))
      console.log('✅ Updated retirement savings calculator to require authentication')
    } else {
      // Add new retirement savings calculator
      await db.insert(calculators).values({
        id: 'retirement-savings-' + Date.now(),
        name: 'เครื่องคำนวณเงินออมเกษียณ',
        description: 'วางแผนการเงินเพื่อความมั่นคงทางเกษียณ คำนวณเงินออมและการลงทุนสำหรับอนาคตที่มั่นคง',
        category: 'financial',
        slug: 'retirement-savings',
        featured: true,
        externalUrl: 'https://retirement-savings-c--dominixz.github.app/',
        requiresAuth: true,
        metadata: JSON.stringify({
          keywords: ['เกษียณ', 'เงินออม', 'วางแผนการเงิน', 'การลงทุน', 'บำนาญ', 'อนาคต', 'เครื่องคำนวณ']
        })
      })
      console.log('✅ Added retirement savings calculator as premium (requires login)')
    }

    // List all calculators to verify
    const allCalculators = await db.select().from(calculators)
    console.log('\nAll calculators:')
    allCalculators.forEach(calc => {
      const authStatus = calc.requiresAuth ? '🔒 Premium' : '🌐 Public'
      console.log(`${authStatus} ${calc.name} (${calc.slug})`)
    })

    console.log('\nRetirement calculator is now set as premium - users must login with GitHub to access it!')

  } catch (error) {
    console.error('Error:', error)
  }
}

addRetirementCalculator()
