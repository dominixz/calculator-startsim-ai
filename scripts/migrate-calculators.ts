import { db } from '@/lib/db'

async function migrateCalculatorsTable() {
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
        await db.run(statement)
        console.log(`✅ Executed: ${statement}`)
      } catch (error: any) {
        if (error.message.includes('duplicate column name')) {
          console.log(`⚠️  Column already exists: ${statement}`)
        } else {
          console.log(`❌ Error with: ${statement}`, error.message)
        }
      }
    }
    
    console.log('🎉 Migration completed!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

migrateCalculatorsTable()
