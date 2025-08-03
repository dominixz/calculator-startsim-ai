export interface Calculator {
  id: string
  name: string
  description: string
  category: string
  slug: string
  icon?: string
}

export interface CalculationResult {
  id: string
  userId: string
  calculatorType: string
  inputs: Record<string, unknown>
  results: Record<string, unknown>
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface LoanCalculatorInputs {
  principal: number
  interestRate: number
  loanTerm: number
  paymentFrequency: 'monthly' | 'yearly'
}

export interface LoanCalculatorResults {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  amortizationSchedule: Array<{
    payment: number
    principal: number
    interest: number
    balance: number
  }>
}

export interface TaxCalculatorInputs {
  income: number
  filingStatus: 'single' | 'married' | 'head_of_household'
  deductions: number
  state?: string
}

export interface TaxCalculatorResults {
  federalTax: number
  stateTax: number
  totalTax: number
  afterTaxIncome: number
  effectiveRate: number
}

export interface InvestmentCalculatorInputs {
  initialAmount: number
  monthlyContribution: number
  annualReturn: number
  years: number
  compoundFrequency: number
}

export interface InvestmentCalculatorResults {
  finalAmount: number
  totalContributions: number
  totalGrowth: number
  yearlyBreakdown: Array<{
    year: number
    balance: number
    contributions: number
    growth: number
  }>
}
