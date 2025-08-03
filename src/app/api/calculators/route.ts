import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { calculationHistory, calculators } from '@/lib/schema'
import { nanoid } from 'nanoid'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    // Fetch all active calculators
    const allCalculators = await db
      .select()
      .from(calculators)
      .where(eq(calculators.isActive, true))
      .orderBy(calculators.featured, calculators.createdAt)

    return NextResponse.json({
      success: true,
      calculators: allCalculators
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch calculators',
      calculators: []
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { calculatorType, inputs, results, title, userId = 'anonymous' } = body

    const calculation = await db.insert(calculationHistory).values({
      id: nanoid(),
      userId,
      calculatorType,
      inputs: JSON.stringify(inputs),
      results: JSON.stringify(results),
      title,
    }).returning()

    return NextResponse.json(calculation[0])
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to save calculation' }, { status: 500 })
  }
}
