const { createClient } = require('@libsql/client')
require('dotenv').config({ path: '.env.local' })

async function checkTables() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  
  try {
    console.log('🔍 Checking existing tables...')
    
    // List all tables
    const tables = await client.execute(`SELECT name FROM sqlite_master WHERE type='table'`)
    console.log('📋 Existing tables:', tables.rows.map(row => row.name))
    
    // Check if calculators table exists and its structure
    try {
      const calculatorsSchema = await client.execute(`PRAGMA table_info(calculators)`)
      console.log('🏗️  Calculators table structure:')
      calculatorsSchema.rows.forEach(row => {
        console.log(`  - ${row.name}: ${row.type} (${row.notnull ? 'NOT NULL' : 'NULL'})`)
      })
    } catch (error) {
      console.log('❌ Calculators table does not exist')
    }
    
    client.close()
  } catch (error) {
    console.error('❌ Error checking tables:', error)
    client.close()
  }
}

checkTables()
