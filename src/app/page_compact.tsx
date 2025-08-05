'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Calculator, ExternalLink, Shield, Lock, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/ui/LoginModal'

interface Calculator {
  id: string
  name: string
  description: string | null
  category: string
  slug: string
  featured: boolean
  externalUrl: string | null
  requiresAuth: boolean
  metadata: string | null
}

interface CalculatorMetadata {
  keywords?: string[]
}

const categoryColors = {
  business: 'bg-gradient-to-br from-blue-500 to-blue-600',
  financial: 'bg-gradient-to-br from-emerald-500 to-green-600',
  educational: 'bg-gradient-to-br from-purple-500 to-violet-600',
  design: 'bg-gradient-to-br from-pink-500 to-rose-600',
  health: 'bg-gradient-to-br from-red-500 to-red-600',
  science: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
} as const

export default function HomePage() {
  const [calculators, setCalculators] = useState<Calculator[]>([])
  const [filteredCalculators, setFilteredCalculators] = useState<Calculator[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null)

  // Fetch calculators from API
  useEffect(() => {
    async function fetchCalculators() {
      try {
        const response = await fetch('/api/calculators')
        const data = await response.json()
        setCalculators(data.calculators || [])
        setFilteredCalculators(data.calculators || [])
      } catch (error) {
        console.error('Error fetching calculators:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCalculators()
  }, [])

  // Filter calculators based on search and category
  useEffect(() => {
    let filtered = calculators

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(calc => 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(calc => calc.category === selectedCategory)
    }

    setFilteredCalculators(filtered)
  }, [searchQuery, selectedCategory, calculators])

  const categories = Array.from(new Set(calculators.map(calc => calc.category)))

  const handleCalculatorClick = (calculator: Calculator) => {
    if (calculator.requiresAuth) {
      // Show login modal for protected calculators
      setSelectedCalculator(calculator)
      setShowLoginModal(true)
      return
    }

    // Redirect to external URL or internal page
    if (calculator.externalUrl) {
      window.open(calculator.externalUrl, '_blank')
    } else {
      window.location.href = `/calculators/${calculator.slug}`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Loading calculators...</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-6">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent sm:text-5xl">
            Calculator Startsim.ai
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive collection of professional calculation tools for every need
          </p>
          <div className="mt-8 h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search calculators..."
              className="pl-12 pr-4 py-3 text-base border-0 bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl focus:shadow-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredCalculators.length} of {calculators.length} calculators
          </p>
        </div>

        {/* Compact Calculators Grid */}
        {filteredCalculators.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredCalculators.map((calculator) => {
              let metadata: CalculatorMetadata = {}
              try {
                if (calculator.metadata && typeof calculator.metadata === 'string') {
                  metadata = JSON.parse(calculator.metadata)
                } else if (calculator.metadata && typeof calculator.metadata === 'object') {
                  metadata = calculator.metadata as CalculatorMetadata
                }
              } catch (error) {
                console.warn('Failed to parse calculator metadata:', error)
                metadata = {}
              }
              const categoryColor = categoryColors[calculator.category as keyof typeof categoryColors] || 'bg-gradient-to-br from-gray-500 to-gray-600'
              
              return (
                <Card 
                  key={calculator.id} 
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 h-fit border-0 bg-white/70 backdrop-blur-sm overflow-hidden relative"
                  onClick={() => handleCalculatorClick(calculator)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${categoryColor} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Calculator className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-1.5 ml-3">
                        {calculator.featured && (
                          <span className="rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800 flex items-center gap-1">
                            <Star className="h-2.5 w-2.5" />
                            Featured
                          </span>
                        )}
                        {calculator.requiresAuth && (
                          <div className="flex items-center gap-1 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-800">
                            <Lock className="h-2.5 w-2.5" />
                            Login
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className="text-sm leading-tight group-hover:text-blue-600 line-clamp-2">
                      {calculator.name}
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-2 text-xs">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="mb-3">
                      <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 capitalize">
                        {calculator.category}
                      </span>
                    </div>
                    
                    {metadata.keywords && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {metadata.keywords.slice(0, 2).map((keyword: string, index: number) => (
                          <span key={index} className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-blue-600 group-hover:text-blue-700">
                        {calculator.requiresAuth ? (
                          <>
                            <Shield className="h-3 w-3" />
                            <span>Sign in</span>
                          </>
                        ) : calculator.externalUrl ? (
                          <>
                            <ExternalLink className="h-3 w-3" />
                            <span>Visit</span>
                          </>
                        ) : (
                          <>
                            <Calculator className="h-3 w-3" />
                            <span>Use</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calculator className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No calculators found</h3>
            <p className="text-gray-600 mb-3">
              Try adjusting your search terms or category filter
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              variant="outline"
              size="sm"
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Compact Categories Overview */}
        <div className="mt-8 border-t pt-6">
          <h3 className="mb-4 text-center text-lg font-semibold text-gray-900">
            Quick Category Filter
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => {
              const categoryCount = calculators.filter(calc => calc.category === category).length
              const categoryColor = categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500'
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all hover:shadow-sm ${
                    selectedCategory === category ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`flex h-4 w-4 items-center justify-center rounded-full ${categoryColor}`}>
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <span className="font-medium capitalize">{category}</span>
                  <span className="text-xs text-gray-500">({categoryCount})</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        calculatorName={selectedCalculator?.name || ''}
        calculatorDescription={selectedCalculator?.description || ''}
      />
    </div>
  )
}
