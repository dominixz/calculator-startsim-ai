'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DollarSign, Calculator, TrendingUp, Info, Download, Save } from 'lucide-react'

interface LoanResult {
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

export function LoanCalculator() {
  const [principal, setPrincipal] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [loanTerm, setLoanTerm] = useState<string>('')
  const [result, setResult] = useState<LoanResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateLoan = async () => {
    setIsCalculating(true)
    
    const p = parseFloat(principal)
    const r = parseFloat(interestRate) / 100 / 12 // Monthly interest rate
    const n = parseFloat(loanTerm) * 12 // Total number of payments

    if (p <= 0 || r <= 0 || n <= 0) {
      setIsCalculating(false)
      return
    }

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    // Calculate monthly payment using the standard loan formula
    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - p

    // Generate amortization schedule
    const amortizationSchedule = []
    let remainingBalance = p

    for (let i = 1; i <= n; i++) {
      const interestPayment = remainingBalance * r
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment

      amortizationSchedule.push({
        payment: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      })

      if (remainingBalance <= 0) break
    }

    const calculationResult = {
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortizationSchedule
    }

    setResult(calculationResult)
    setIsCalculating(false)

    // Save to database
    try {
      await fetch('/api/calculators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calculatorType: 'loan',
          inputs: { principal: p, interestRate: parseFloat(interestRate), loanTerm: parseFloat(loanTerm) },
          results: {
            monthlyPayment,
            totalPayment,
            totalInterest,
            scheduleLength: amortizationSchedule.length
          },
          title: `Loan: $${p.toLocaleString()} at ${interestRate}% for ${loanTerm} years`
        })
      })
    } catch (error) {
      console.error('Failed to save calculation:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercent = (amount: number, total: number) => {
    return ((amount / total) * 100).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Loan Calculator</h1>
          <p className="text-lg text-gray-600">
            Calculate monthly payments, total interest, and create detailed amortization schedules
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  <CardTitle>Loan Details</CardTitle>
                </div>
                <CardDescription className="text-blue-100">
                  Enter your loan information below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="250,000"
                      className="pl-8 text-lg font-medium"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Enter the total amount you want to borrow</p>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Annual Interest Rate
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="4.5"
                      className="pr-8 text-lg font-medium"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Annual percentage rate (APR)</p>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Loan Term
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      placeholder="30"
                      className="pr-14 text-lg font-medium"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Length of the loan in years</p>
                </div>
                
                <Button 
                  onClick={calculateLoan} 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-lg font-semibold hover:from-blue-700 hover:to-blue-800"
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Calculating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Calculate Loan
                    </div>
                  )}
                </Button>

                {result && (
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {result ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-l-4 border-l-blue-500 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Monthly Payment</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {formatCurrency(result.monthlyPayment)}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Payment</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {formatCurrency(result.totalPayment)}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Interest</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {formatCurrency(result.totalInterest)}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <Info className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Breakdown */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Payment Breakdown
                    </CardTitle>
                    <CardDescription>
                      Visual breakdown of your loan payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          <span className="font-medium">Principal</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(parseFloat(principal))}</p>
                          <p className="text-sm text-gray-500">
                            {formatPercent(parseFloat(principal), result.totalPayment)}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                          <span className="font-medium">Interest</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(result.totalInterest)}</p>
                          <p className="text-sm text-gray-500">
                            {formatPercent(result.totalInterest, result.totalPayment)}%
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-lg font-semibold">{formatCurrency(result.totalPayment)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Amortization Schedule */}
                {result.amortizationSchedule.length > 0 && (
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Amortization Schedule
                      </CardTitle>
                      <CardDescription>
                        First 12 payments breakdown - showing how your payments are applied
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Payment #</th>
                              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Principal</th>
                              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Interest</th>
                              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {result.amortizationSchedule.slice(0, 12).map((payment) => (
                              <tr key={payment.payment} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{payment.payment}</td>
                                <td className="px-4 py-3 text-right font-medium text-green-600">
                                  {formatCurrency(payment.principal)}
                                </td>
                                <td className="px-4 py-3 text-right font-medium text-orange-600">
                                  {formatCurrency(payment.interest)}
                                </td>
                                <td className="px-4 py-3 text-right font-medium">
                                  {formatCurrency(payment.balance)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {result.amortizationSchedule.length > 12 && (
                        <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center">
                          <p className="text-sm text-blue-700">
                            Showing first 12 payments of {result.amortizationSchedule.length} total payments
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Full Schedule
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="flex h-96 items-center justify-center shadow-lg">
                <div className="text-center">
                  <Calculator className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Ready to Calculate</h3>
                  <p className="text-gray-600">
                    Enter your loan details in the form to see your payment breakdown
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
