import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { calculators } from '../src/lib/schema.ts'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

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

  } catch (error) {
    console.error('Error:', error)
  }
}

addRetirementCalculator()
