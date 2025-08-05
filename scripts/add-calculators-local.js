const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const { eq } = require('drizzle-orm')

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

// Use local database
const client = createClient({
  url: 'file:local.db'
})

const db = drizzle(client)

const calculatorsList = [
  // Public calculators
  {
    id: 'selling-price-' + Date.now(),
    name: 'Selling Price Calculator',
    description: 'Calculate the optimal selling price based on cost and desired profit margin.',
    category: 'business', 
    slug: 'selling-price',
    icon: '💰',
    featured: true,
    requiresAuth: false,
  },
  {
    id: 'conversion-pricing-' + (Date.now() + 1),
    name: 'Free Conversion & Pricing Calculator',
    description: 'Convert currencies and calculate pricing across different markets and regions.',
    category: 'business',
    slug: 'conversion-pricing', 
    icon: '💱',
    featured: true,
    requiresAuth: false,
  },
  {
    id: 'one-dollar-simulation-' + (Date.now() + 2),
    name: '$1 Simulation Game',
    description: 'Interactive simulation game to understand the value and potential of one dollar.',
    category: 'educational',
    slug: 'one-dollar-simulation',
    icon: '🎮',
    featured: true,
    requiresAuth: false,
  },
  {
    id: 'text-to-image-' + (Date.now() + 3),
    name: 'Simple Text to Image Generator',  
    description: 'Generate simple images from text descriptions using AI technology.',
    category: 'productivity',
    slug: 'text-to-image',
    icon: '🖼️',
    featured: true,
    requiresAuth: false,
  },
  
  // Premium calculators (require login)
  {
    id: 'life-calculator-' + (Date.now() + 4),
    name: 'Life Calculator',
    description: 'Comprehensive life planning calculator for major life decisions and milestones.',
    category: 'personal',
    slug: 'life-calculator',
    icon: '🌟',
    featured: true,
    requiresAuth: true,
  },
  {
    id: 'unit-value-comparison-' + (Date.now() + 5),
    name: 'Unit Value Comparison Tool',
    description: 'Compare unit values across different products and packages to find the best deals.',
    category: 'shopping',
    slug: 'unit-value-comparison',
    icon: '📊',
    featured: true,
    requiresAuth: true,
  },
  {
    id: 'churn-rate-calculator-' + (Date.now() + 6),
    name: 'Churn Rate Threshold Calculator',
    description: 'Calculate customer churn rates and identify critical thresholds for business health.',
    category: 'business',
    slug: 'churn-rate-calculator',
    icon: '📉',
    featured: true,
    requiresAuth: true,
  },
  {
    id: 'emergency-fund-calculator-' + (Date.now() + 7),
    name: 'Peace of Mind & Emergency Fund Calculator',
    description: 'Plan your emergency fund and achieve financial peace of mind with personalized calculations.',
    category: 'financial',
    slug: 'emergency-fund-calculator',
    icon: '🛡️',
    featured: true,
    requiresAuth: true,
  },
  {
    id: 'budget-calculator-advanced-' + (Date.now() + 8),
    name: 'Budget Calculator',
    description: 'Advanced budgeting tool with detailed categorization and financial planning features.',
    category: 'financial',
    slug: 'budget-calculator-advanced',
    icon: '💼',
    featured: true,
    requiresAuth: true,
  },
  {
    id: 'youtube-ai-summarizer-' + (Date.now() + 9),
    name: 'YouTube AI Summarizer',
    description: 'AI-powered tool to summarize YouTube videos and extract key insights quickly.',
    category: 'productivity',
    slug: 'youtube-ai-summarizer',
    icon: '🤖',
    featured: true,
    requiresAuth: true,
  },
  {
    id: 'retirement-savings-' + (Date.now() + 10),
    name: 'Retirement Savings Calculator',
    description: 'Plan your retirement with comprehensive savings calculations. Determine how much you need to save monthly to achieve your retirement goals.',
    category: 'financial',
    slug: 'retirement-savings',
    icon: '🏦',
    featured: true,
    requiresAuth: true,
  },
  {
    id: 'date-analyzer-' + (Date.now() + 11),
    name: 'Date Explorer & Analyzer',
    description: 'Discover comprehensive temporal information and compare dates with precision. Analyze date patterns, calculate differences, and explore historical data.',
    category: 'productivity',
    slug: 'date-analyzer',
    icon: '📅',
    featured: true,
    externalUrl: 'https://date-analyzer--dominixz.github.app',
    requiresAuth: true,
    metadata: JSON.stringify({
      keywords: ['date', 'analyzer', 'explorer', 'temporal', 'calendar', 'time', 'comparison', 'calculator']
    })
  }
]

async function addCalculators() {
  try {
    console.log('Adding calculators to local database...')
    
    // Clear existing calculators first
    await db.delete(calculators)
    console.log('✅ Cleared existing calculators')
    
    // Add all calculators
    for (const calculator of calculatorsList) {
      await db.insert(calculators).values(calculator)
      const authStatus = calculator.requiresAuth ? '🔒 Premium' : '🌐 Public'
      console.log(`✅ Added ${authStatus} ${calculator.name}`)
    }

    // Verify the additions
    const allCalculators = await db.select().from(calculators)
    console.log(`\n📊 Total calculators in database: ${allCalculators.length}`)
    console.log('\nBreakdown:')
    const premium = allCalculators.filter(c => c.requiresAuth).length
    const public = allCalculators.filter(c => !c.requiresAuth).length
    console.log(`🌐 Public calculators: ${public}`)
    console.log(`🔒 Premium calculators: ${premium}`)
    
    console.log('\n🎉 All calculators successfully added to local database!')
    console.log('📅 Date Explorer & Analyzer is now available as a premium calculator!')

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

addCalculators()
