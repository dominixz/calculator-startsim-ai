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

async function addBMICalculator() {
  try {
    console.log('Adding BMI Calculator to cloud database...')
    
    // Check if calculator already exists
    const existing = await db
      .select()
      .from(calculators)
      .where(eq(calculators.slug, 'bmi-calculator'))

    if (existing.length > 0) {
      console.log('BMI Calculator already exists, updating to require auth...')
      await db
        .update(calculators)
        .set({ 
          requiresAuth: true,
          name: 'Health Calculator - BMI & TDEE',
          description: 'Calculate your BMI (Body Mass Index) and TDEE (Total Daily Energy Expenditure). Get personalized health insights and daily calorie needs for optimal wellness.',
          externalUrl: 'https://bmi-calculator--dominixz.github.app/'
        })
        .where(eq(calculators.slug, 'bmi-calculator'))
      console.log('✅ Updated BMI Calculator to require authentication')
    } else {
      // Add new BMI Calculator
      await db.insert(calculators).values({
        id: 'bmi-calculator-' + Date.now(),
        name: 'Health Calculator - BMI & TDEE',
        description: 'Calculate your BMI (Body Mass Index) and TDEE (Total Daily Energy Expenditure). Get personalized health insights and daily calorie needs for optimal wellness.',
        category: 'health',
        slug: 'bmi-calculator',
        featured: true,
        externalUrl: 'https://bmi-calculator--dominixz.github.app/',
        requiresAuth: true,
        metadata: JSON.stringify({
          keywords: ['bmi', 'health', 'calculator', 'tdee', 'calorie', 'fitness', 'body mass index', 'wellness', 'nutrition']
        })
      })
      console.log('✅ Added Health Calculator - BMI & TDEE as premium calculator (requires login)')
    }

    // List all calculators to verify
    const allCalculators = await db.select().from(calculators)
    console.log(`\n📊 Total calculators in cloud database: ${allCalculators.length}`)
    console.log('\nBreakdown:')
    const premium = allCalculators.filter(c => c.requiresAuth).length
    const public = allCalculators.filter(c => !c.requiresAuth).length
    console.log(`🌐 Public calculators: ${public}`)
    console.log(`🔒 Premium calculators: ${premium}`)

    console.log('\n🎉 Health Calculator - BMI & TDEE successfully added as premium calculator!')
    console.log('💪 Users must login with GitHub to access the BMI & TDEE calculator!')

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

addBMICalculator()
