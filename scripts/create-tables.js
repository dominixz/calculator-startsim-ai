const { createClient } = require('@libsql/client')
require('dotenv').config({ path: '.env.local' })

async function createTables() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  
  try {
    console.log('🔄 Creating tables...')
    
    // Create users table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        image TEXT,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch())
      )
    `)
    console.log('✅ Created users table')
    
    // Create calculators table with all the fields we need
    await client.execute(`
      CREATE TABLE IF NOT EXISTS calculators (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        icon TEXT,
        featured INTEGER DEFAULT 0,
        external_url TEXT,
        requires_auth INTEGER DEFAULT 0,
        metadata TEXT,
        is_active INTEGER DEFAULT 1,
        created_at INTEGER DEFAULT (unixepoch())
      )
    `)
    console.log('✅ Created calculators table')
    
    // Create calculation_history table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS calculation_history (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        calculator_type TEXT NOT NULL,
        inputs TEXT NOT NULL,
        results TEXT NOT NULL,
        title TEXT,
        created_at INTEGER DEFAULT (unixepoch())
      )
    `)
    console.log('✅ Created calculation_history table')
    
    // Create accounts table for NextAuth
    await client.execute(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        provider_account_id TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT
      )
    `)
    console.log('✅ Created accounts table')
    
    // Create sessions table for NextAuth
    await client.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        session_token TEXT NOT NULL UNIQUE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires INTEGER NOT NULL
      )
    `)
    console.log('✅ Created sessions table')
    
    // Create verification_tokens table for NextAuth
    await client.execute(`
      CREATE TABLE IF NOT EXISTS verification_tokens (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires INTEGER NOT NULL,
        PRIMARY KEY (identifier, token)
      )
    `)
    console.log('✅ Created verification_tokens table')
    
    console.log('🎉 All tables created successfully!')
    client.close()
  } catch (error) {
    console.error('❌ Error creating tables:', error)
    client.close()
  }
}

createTables()
