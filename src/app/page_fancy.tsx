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
  business: 'from-blue-500 to-blue-600',
  financial: 'from-emerald-500 to-green-600',
  educational: 'from-purple-500 to-violet-600',
  design: 'from-pink-500 to-rose-600',
  health: 'from-red-500 to-red-600',
  science: 'from-indigo-500 to-indigo-600',
} as const

const categoryIcons = {
  business: TrendingUp,
  financial: Calculator,
  educational: Star,
  design: Sparkles,
  health: Zap,
  science: Calculator,
} as const

export default function HomePage() {
  const [calculators, setCalculators] = useState<Calculator[]>([])
  const [filteredCalculators, setFilteredCalculators] = useState<Calculator[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null)

  useEffect(() => {
    fetchCalculators()
  }, [])

  useEffect(() => {
    let filtered = calculators

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(calc =>
        calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (calc.description && calc.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        calc.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(calc => calc.category === selectedCategory)
    }

    setFilteredCalculators(filtered)
  }, [searchTerm, selectedCategory, calculators])

  const fetchCalculators = async () => {
    try {
      const response = await fetch('/api/calculators')
      if (response.ok) {
        const data = await response.json()
        setCalculators(data.calculators || [])
        setFilteredCalculators(data.calculators || [])
      }
    } catch (error) {
      console.error('Error fetching calculators:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCalculatorClick = (calculator: Calculator) => {
    if (calculator.requiresAuth) {
      setSelectedCalculator(calculator)
      setShowLoginModal(true)
    } else if (calculator.externalUrl) {
      window.open(calculator.externalUrl, '_blank')
    } else {
      window.location.href = `/calculators/${calculator.slug}`
    }
  }

  const safeParseMetadata = (metadata: unknown): CalculatorMetadata => {
    try {
      if (typeof metadata === 'string') {
        return JSON.parse(metadata) as CalculatorMetadata
      } else if (typeof metadata === 'object' && metadata !== null) {
        return metadata as CalculatorMetadata
      }
      return {}
    } catch (error) {
      console.warn('Failed to parse metadata:', error)
      return {}
    }
  }

  const categories = [...new Set(calculators.map(calc => calc.category))]
  const featuredCalculators = calculators.filter(calc => calc.featured)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-2xl animate-pulse" />
            <Calculator className="relative mx-auto h-16 w-16 text-blue-600 animate-bounce" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-full w-48 mx-auto animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-full w-32 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 border-b border-white/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/25 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Calculator className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                Calculator
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Startsim.ai
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 leading-relaxed">
              Professional calculators and interactive tools for business, education, and innovation. 
              Make smarter decisions with our comprehensive suite of calculation tools.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {calculators.length}+
                </div>
                <div className="text-sm text-gray-600">Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Free
                </div>
                <div className="text-sm text-gray-600">Forever</div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="mx-auto max-w-3xl">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative flex">
                  <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search calculators, tools, or categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-l-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm py-5 pl-14 pr-6 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-lg"
                    />
                  </div>
                  <button className="rounded-r-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25">
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200/50'
              }`}
            >
              All Tools ({calculators.length})
            </button>
            {categories.map((category) => {
              const count = calculators.filter(calc => calc.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200/50'
                  }`}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured Calculators */}
      {featuredCalculators.length > 0 && selectedCategory === 'all' && !searchTerm && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              ⭐ Featured Tools
            </h2>
            <p className="text-gray-600">Our most popular and powerful calculators</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCalculators.slice(0, 6).map((calculator) => {
              const categoryColor = categoryColors[calculator.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'
              const CategoryIcon = categoryIcons[calculator.category as keyof typeof categoryIcons] || Calculator
              
              return (
                <div
                  key={calculator.id}
                  onClick={() => handleCalculatorClick(calculator)}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm p-8 cursor-pointer transition-all duration-500 hover:border-blue-300/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-3 hover:scale-[1.02]"
                >
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${categoryColor} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <CategoryIcon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {calculator.name}
                  </h3>
                  
                  <p className="mb-6 text-gray-600 line-clamp-3 leading-relaxed">
                    {calculator.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      {calculator.requiresAuth ? (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Login Required
                        </>
                      ) : (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Tool
                        </>
                      )}
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* All Calculators Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredCalculators.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <Search className="mx-auto h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No calculators found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {selectedCategory === 'all' ? 'All Tools' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tools`}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCalculators.map((calculator) => {
                const metadata = safeParseMetadata(calculator.metadata)
                const categoryColor = categoryColors[calculator.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'
                const CategoryIcon = categoryIcons[calculator.category as keyof typeof categoryIcons] || Calculator
                
                return (
                  <div
                    key={calculator.id}
                    onClick={() => handleCalculatorClick(calculator)}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2"
                  >
                    {calculator.featured && (
                      <div className="absolute top-3 right-3">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    )}
                    
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${categoryColor} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <CategoryIcon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {calculator.name}
                    </h3>
                    
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      {calculator.description}
                    </p>
                    
                    {metadata.keywords && metadata.keywords.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {metadata.keywords.slice(0, 2).map((keyword, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 text-xs font-medium text-gray-600"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                        {calculator.requiresAuth ? (
                          <>
                            <Lock className="mr-1 h-4 w-4" />
                            Login Required
                          </>
                        ) : (
                          <>
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Open Tool
                          </>
                        )}
                      </div>
                      
                      {calculator.requiresAuth && (
                        <div className="rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 p-1">
                          <Lock className="h-3 w-3 text-amber-600" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
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
