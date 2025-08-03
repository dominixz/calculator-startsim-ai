import { notFound } from 'next/navigation'
import { LoanCalculator } from '@/components/calculators/LoanCalculator'

const calculators = {
  'loan': {
    component: LoanCalculator,
    title: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and amortization schedules for any loan.'
  },
  // Add more calculators here as they are created
}

export default async function CalculatorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const calculator = calculators[slug as keyof typeof calculators]
  
  if (!calculator) {
    notFound()
  }

  const CalculatorComponent = calculator.component

  return (
    <div className="container mx-auto px-4 py-8">
      <CalculatorComponent />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(calculators).map((slug) => ({
    slug,
  }))
}
