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

async function addTRIZCalculator() {
  try {
    console.log('Adding TRIZ 9-Box Analysis to database...')
    
    // Check if calculator already exists
    const existing = await db
      .select()
      .from(calculators)
      .where(eq(calculators.slug, 'triz-9-box-analysis'))

    if (existing.length > 0) {
      console.log('TRIZ 9-Box Analysis already exists, updating...')
      await db
        .update(calculators)
        .set({ 
          requiresAuth: true,
          name: 'TRIZ 9-Box Analysis Tool',
          description: 'Advanced problem-solving methodology using TRIZ (Theory of Inventive Problem Solving) 9-box matrix. Analyze technical systems evolution, identify innovation opportunities, and solve complex engineering challenges systematically.',
          externalUrl: 'https://triz-9-box-analysis--dominixz.github.app/'
        })
        .where(eq(calculators.slug, 'triz-9-box-analysis'))
      console.log('✅ Updated TRIZ 9-Box Analysis to require authentication')
    } else {
      // Add new TRIZ Calculator
      await db.insert(calculators).values({
        id: 'triz-9-box-analysis-' + Date.now(),
        name: 'TRIZ 9-Box Analysis Tool',
        description: 'Advanced problem-solving methodology using TRIZ (Theory of Inventive Problem Solving) 9-box matrix. Analyze technical systems evolution, identify innovation opportunities, and solve complex engineering challenges systematically.',
        category: 'business',
        slug: 'triz-9-box-analysis',
        featured: true,
        externalUrl: 'https://triz-9-box-analysis--dominixz.github.app/',
        requiresAuth: true,
        metadata: JSON.stringify({
          keywords: ['triz', '9-box analysis', 'problem solving', 'innovation', 'engineering', 'methodology', 'technical analysis', 'system evolution', 'inventive principles', 'business tool']
        })
      })
      console.log('✅ Added TRIZ 9-Box Analysis Tool as premium calculator')
    }

    // List all calculators to verify
    const allCalculators = await db.select().from(calculators)
    console.log('\nAll calculators:')
    allCalculators.forEach(calc => {
      const authStatus = calc.requiresAuth ? '🔒 Premium' : '🌐 Public'
      console.log(`${authStatus} ${calc.name} (${calc.slug})`)
    })

    console.log('\n🎉 TRIZ 9-Box Analysis Tool ready! Users must login to access it.')

  } catch (error) {
    console.error('Error:', error)
  }
}

addTRIZCalculator()
