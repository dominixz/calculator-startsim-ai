const { createClient } = require('@libsql/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function makeCalculatorsPublic() {
  try {
    console.log('🔓 Making specific calculators accessible without login...')
    
    // Update $1 Simulation Game
    await client.execute({
      sql: `UPDATE calculators SET requires_auth = 0 WHERE name = ?`,
      args: ['$1 Simulation Game']
    })
    console.log('✅ Updated: $1 Simulation Game - Now public')
    
    // Update Simple Text to Image Generator
    await client.execute({
      sql: `UPDATE calculators SET requires_auth = 0 WHERE name = ?`,
      args: ['Simple Text to Image Generator']
    })
    console.log('✅ Updated: Simple Text to Image Generator - Now public')
    
    // Show current status
    const publicCalcs = await client.execute('SELECT name, requires_auth FROM calculators WHERE requires_auth = 0')
    console.log('\n🌐 Public calculators (no login required):')
    publicCalcs.rows.forEach(row => {
      console.log(`  🔓 ${row.name}`)
    })
    
    const premiumCalcs = await client.execute('SELECT name, requires_auth FROM calculators WHERE requires_auth = 1')
    console.log('\n🔐 Premium calculators (login required):')
    premiumCalcs.rows.forEach(row => {
      console.log(`  🔒 ${row.name}`)
    })
    
    console.log('\n🎉 Updates completed successfully!')
    
  } catch (error) {
    console.error('❌ Error updating calculators:', error)
  }
}

makeCalculatorsPublic()
