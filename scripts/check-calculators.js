const { createClient } = require('@libsql/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function checkCalculators() {
  try {
    const result = await client.execute('SELECT COUNT(*) as total FROM calculators')
    console.log(`📊 Total calculators in database: ${result.rows[0].total}`)
    
    const authRequired = await client.execute('SELECT COUNT(*) as total FROM calculators WHERE requires_auth = 1')
    console.log(`🔐 Premium calculators (require login): ${authRequired.rows[0].total}`)
    
    const featured = await client.execute('SELECT COUNT(*) as total FROM calculators WHERE featured = 1')
    console.log(`⭐ Featured calculators: ${featured.rows[0].total}`)
    
    console.log('\n🆕 Recently added calculators:')
    const recent = await client.execute('SELECT name, external_url, requires_auth FROM calculators ORDER BY created_at DESC LIMIT 6')
    recent.rows.forEach(row => {
      console.log(`  ${row.requires_auth === 1 ? '🔐' : '🔓'} ${row.name} - ${row.external_url}`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

checkCalculators()
