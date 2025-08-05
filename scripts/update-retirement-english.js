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

async function updateRetirementCalculator() {
  try {
    console.log('Updating Retirement Savings Calculator to English...')
    
    // Update the Thai retirement calculator to English
    const result = await db
      .update(calculators)
      .set({ 
        name: 'Retirement Savings Calculator',
        description: 'Plan your retirement with comprehensive savings calculations. Determine how much you need to save monthly to achieve your retirement goals.'
      })
      .where(eq(calculators.slug, 'retirement-savings'))

    console.log('✅ Updated Retirement Savings Calculator to English')

    // Verify the update
    const updated = await db
      .select()
      .from(calculators)
      .where(eq(calculators.slug, 'retirement-savings'))

    if (updated.length > 0) {
      console.log(`✅ Verified: ${updated[0].name}`)
      console.log(`📝 Description: ${updated[0].description}`)
    }

    // List all calculators to verify
    const allCalculators = await db.select().from(calculators)
    console.log(`\n📊 Total calculators in cloud database: ${allCalculators.length}`)
    
    const premium = allCalculators.filter(c => c.requiresAuth).length
    const public = allCalculators.filter(c => !c.requiresAuth).length
    console.log(`🌐 Public calculators: ${public}`)
    console.log(`🔒 Premium calculators: ${premium}`)

    console.log('\n🎉 Retirement Savings Calculator successfully updated to English!')

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

updateRetirementCalculator()
