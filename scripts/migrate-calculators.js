const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
require('dotenv').config({ path: '.env.local' })

async function migrateCalculatorsTable() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  
  const db = drizzle(client)
  
  try {
    console.log('🔄 Adding new columns to calculators table...')
    
    // Add the new columns one by one to avoid conflicts
    const alterStatements = [
      `ALTER TABLE calculators ADD COLUMN featured INTEGER DEFAULT 0`,
      `ALTER TABLE calculators ADD COLUMN external_url TEXT`,
      `ALTER TABLE calculators ADD COLUMN requires_auth INTEGER DEFAULT 0`,
      `ALTER TABLE calculators ADD COLUMN metadata TEXT`
    ]
    
    for (const statement of alterStatements) {
      try {
        await client.execute(statement)
        console.log(`✅ Executed: ${statement}`)
      } catch (error) {
        if (error.message.includes('duplicate column name')) {
          console.log(`⚠️  Column already exists: ${statement}`)
        } else {
          console.log(`❌ Error with: ${statement}`, error.message)
        }
      }
    }
    
    console.log('🎉 Migration completed!')
    client.close()
  } catch (error) {
    console.error('❌ Migration failed:', error)
    client.close()
  }
}

migrateCalculatorsTable()
