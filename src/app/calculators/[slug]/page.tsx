import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { LoanCalculator } from '@/components/calculators/LoanCalculator'

const calculators = {
  'loan': {
    component: LoanCalculator,
    title: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and amortization schedules for any loan.',
    keywords: ['loan calculator', 'monthly payment', 'interest calculator', 'amortization', 'finance']
  },
  // Add more calculators here as they are created
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const calculator = calculators[slug as keyof typeof calculators]
  
  if (!calculator) {
    return {
      title: 'Calculator Not Found - Calculator Startsim.AI',
      description: 'The requested calculator was not found.'
    }
  }

  return {
    title: `${calculator.title} - Calculator Startsim.AI`,
    description: calculator.description,
    keywords: calculator.keywords,
    openGraph: {
      title: `${calculator.title} - Calculator Startsim.AI`,
      description: calculator.description,
      images: ['/api/og'],
      url: `https://calculator-startsim-ai.vercel.app/calculators/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${calculator.title} - Calculator Startsim.AI`,
      description: calculator.description,
      images: ['/api/og'],
    },
    alternates: {
      canonical: `https://calculator-startsim-ai.vercel.app/calculators/${slug}`,
    },
  }
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
