const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const { nanoid } = require('nanoid')
require('dotenv').config({ path: '.env.local' })

const calculatorData = [
  {
    id: nanoid(),
    slug: 'selling-price',
    name: 'Selling Price Calculator',
    description: 'Calculate your selling price based on cost, expected discounts, and desired profit margin or markup. Adjusts your selling price to maintain your target profit margin even after discounts are applied.',
    category: 'business',
    featured: 1,
    external_url: 'https://sellingprice.startsim.ai/',
    requires_auth: 0,
    metadata: JSON.stringify({
      features: [
        'Target profit margin calculation',
        'Discount compensation',
        'Markup-based pricing',
        'Real-time profit analysis',
        'Cost per unit tracking'
      ],
      keywords: ['selling price', 'profit margin', 'markup', 'discount', 'pricing strategy'],
      howItWorks: 'This calculator adjusts your selling price to maintain your target profit margin even after discounts are applied. You set your target margin and expected discount, and we calculate a higher list price to compensate for the discount.'
    })
  },
  {
    id: nanoid(),
    slug: 'conversion-pricing',
    name: 'Free Conversion & Pricing Calculator',
    description: 'Optimize your business profits with data-driven pricing strategy. Analyze 169 pricing scenarios instantly with color-coded profit zones. Perfect for SaaS, e-commerce, and service businesses.',
    category: 'business',
    featured: 1,
    external_url: 'https://conversionsellingprice.startsim.ai/',
    requires_auth: 0,
    metadata: JSON.stringify({
      features: [
        '169 pricing scenarios analysis',
        'Color-coded profit zones',
        'Conversion rate optimization',
        'Risk assessment',
        'Market sizing tools',
        'Fixed and variable cost analysis'
      ],
      keywords: ['conversion rate', 'pricing strategy', 'profit optimization', 'SaaS pricing', 'business profitability'],
      profitZones: {
        red: 'Losing Money (<0% margin) - Avoid these scenarios',
        yellow: 'Break-even to Moderate (0-30% margin) - Acceptable for market entry',
        green: 'High Profitability (>30% margin) - Target for sustainable growth'
      }
    })
  },
  {
    id: nanoid(),
    slug: 'one-dollar-simulation',
    name: '$1 Simulation Game',
    description: 'Interactive money growth simulation game. Start with $1 and watch your earnings grow exponentially! Perfect for learning about compound growth and financial concepts in a fun, engaging way.',
    category: 'educational',
    featured: 1,
    external_url: 'https://onedollarsimulation.startsim.ai/',
    requires_auth: 1, // Requires login
    metadata: JSON.stringify({
      features: [
        '3D coin dropping animation',
        'Exponential growth visualization',
        'Day-by-day progression tracking',
        'Social sharing capabilities',
        'Auto-play functionality',
        'Progress reset options'
      ],
      keywords: ['compound interest', 'money growth', 'financial education', 'simulation game', 'exponential growth'],
      gameRules: 'Start with $1 on Day 1. Each day you earn the day number in dollars. Day 1: $1 total, Day 2: $3 total, Day 3: $6 total, Day 4: $10 total.',
      type: 'interactive-game'
    })
  },
  {
    id: nanoid(),
    slug: 'text-to-image',
    name: 'Simple Text to Image Generator',
    description: 'Generate SEO-friendly SVG images for websites and PNG graphics for social media posts. Perfect for Facebook posts, Instagram stories, LinkedIn banners, and website headers.',
    category: 'design',
    featured: 1,
    external_url: 'https://simpletext2image.startsim.ai/',
    requires_auth: 1, // Requires login
    metadata: JSON.stringify({
      features: [
        'SVG generation for websites',
        'PNG creation for social media',
        'SEO-optimized images',
        'Clean URL structure',
        'Multiple themes and sizes',
        'Professional graphics creation'
      ],
      keywords: ['text to image', 'SVG generator', 'social media graphics', 'SEO images', 'website graphics'],
      formats: ['SVG (for websites)', 'PNG (for social media)'],
      urlStructure: '/api/cover/theme/width/height/text.svg',
      useCases: ['Facebook posts', 'Instagram stories', 'LinkedIn banners', 'Website headers']
    })
  }
]

async function seedCalculators() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  
  try {
    console.log('🌱 Seeding calculators...')
    
    // Insert calculators using raw SQL
    for (const calculator of calculatorData) {
      try {
        await client.execute({
          sql: `INSERT OR IGNORE INTO calculators (id, name, description, category, slug, featured, external_url, requires_auth, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            calculator.id,
            calculator.name,
            calculator.description,
            calculator.category,
            calculator.slug,
            calculator.featured,
            calculator.external_url,
            calculator.requires_auth,
            calculator.metadata
          ]
        })
        console.log(`✅ Added: ${calculator.name}`)
      } catch (error) {
        console.log(`⚠️  Skipped (already exists): ${calculator.name}`)
      }
    }
    
    console.log('🎉 Calculators seeded successfully!')
    client.close()
  } catch (error) {
    console.error('❌ Error seeding calculators:', error)
    client.close()
  }
}

seedCalculators()
