const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const { nanoid } = require('nanoid')
require('dotenv').config({ path: '.env.local' })

const newCalculators = [
  {
    id: nanoid(),
    slug: 'life-calculator',
    name: 'Life Calculator',
    description: 'Discover how much time you\'ve lived and visualize your remaining journey through life\'s chapters.',
    category: 'health',
    featured: 1,
    external_url: 'https://life-countdown-calcu--dominixz.github.app/',
    requires_auth: 1,
    metadata: JSON.stringify({
      keywords: ['life', 'time', 'age', 'mortality', 'visualization', 'journey', 'chapters']
    }),
    is_active: 1,
  },
  {
    id: nanoid(),
    slug: 'unit-value-comparison',
    name: 'Unit Value Comparison Tool',
    description: 'Compare prices across different units to find the best value for your money. Perfect for shopping decisions and bulk buying analysis.',
    category: 'business',
    featured: 1,
    external_url: 'https://size-value-optimizer--dominixz.github.app/',
    requires_auth: 1,
    metadata: JSON.stringify({
      keywords: ['price', 'comparison', 'value', 'shopping', 'bulk', 'analysis', 'units']
    }),
    is_active: 1,
  },
  {
    id: nanoid(),
    slug: 'churn-rate-calculator',
    name: 'Churn Rate Threshold Calculator',
    description: 'Calculate the maximum churn rate your business can tolerate while maintaining revenue growth targets.',
    category: 'business',
    featured: 1,
    external_url: 'https://saas-growth-calculat--dominixz.github.app/',
    requires_auth: 1,
    metadata: JSON.stringify({
      keywords: ['churn', 'rate', 'saas', 'growth', 'revenue', 'business', 'retention']
    }),
    is_active: 1,
  },
  {
    id: nanoid(),
    slug: 'emergency-fund-calculator',
    name: 'Peace of Mind & Emergency Fund Calculator',
    description: 'Build financial security with personalized emergency and peace of mind fund recommendations tailored to your lifestyle.',
    category: 'financial',
    featured: 1,
    external_url: 'https://peace-emergency-fund--dominixz.github.app/',
    requires_auth: 1,
    metadata: JSON.stringify({
      keywords: ['emergency', 'fund', 'financial', 'security', 'planning', 'savings', 'peace of mind']
    }),
    is_active: 1,
  },
  {
    id: nanoid(),
    slug: 'budget-calculator-advanced',
    name: 'Budget Calculator',
    description: 'Use the proven 15-65-20 rule to balance your spending and build wealth. Freedom now and later.',
    category: 'financial',
    featured: 1,
    external_url: 'https://budget-balancer-the--dominixz.github.app/',
    requires_auth: 1,
    metadata: JSON.stringify({
      keywords: ['budget', 'planning', 'wealth', 'spending', 'financial', 'rule', '15-65-20']
    }),
    is_active: 1,
  },
  {
    id: nanoid(),
    slug: 'youtube-ai-summarizer',
    name: 'YouTube AI Summarizer',
    description: 'Transform lengthy videos into digestible insights with AI. Extract key points and actionable takeaways from any YouTube video.',
    category: 'educational',
    featured: 1,
    external_url: 'https://youtube-summarizer-a--dominixz.github.app/',
    requires_auth: 1,
    metadata: JSON.stringify({
      keywords: ['youtube', 'ai', 'summarizer', 'video', 'insights', 'analysis', 'educational']
    }),
    is_active: 1,
  }
]

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const db = drizzle(client)

async function addCalculators() {
  try {
    console.log('🚀 Adding new premium calculators...')
    
    // Insert calculators directly using the client
    for (const calculator of newCalculators) {
      await client.execute({
        sql: `INSERT OR REPLACE INTO calculators (
          id, name, description, category, slug, icon, featured, 
          external_url, requires_auth, metadata, is_active, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          calculator.id,
          calculator.name,
          calculator.description,
          calculator.category,
          calculator.slug,
          calculator.icon || null,
          calculator.featured,
          calculator.external_url,
          calculator.requires_auth,
          calculator.metadata,
          calculator.is_active,
          Date.now()
        ]
      })
      console.log(`✅ Added: ${calculator.name}`)
    }
    
    console.log('🎉 All premium calculators added successfully!')
    console.log('🔐 All calculators require GitHub authentication')
    
  } catch (error) {
    console.error('❌ Error adding calculators:', error)
  }
}

addCalculators()
