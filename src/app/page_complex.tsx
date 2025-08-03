'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Calculator, 
  ExternalLink, 
  Shield, 
  Lock, 
  Star, 
  Sparkles,
  TrendingUp,
  GraduationCap,
  Palette,
  Heart,
  Microscope,
  ArrowRight,
  Zap,
  Users,
  Award,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/ui/LoginModal'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

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

const categoryConfig = {
  business: {
    color: 'from-blue-500 via-blue-600 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
    lightBg: 'from-blue-50 to-indigo-50',
    icon: TrendingUp,
    description: 'Business & Finance'
  },
  financial: {
    color: 'from-emerald-500 via-green-600 to-teal-600',
    bgColor: 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600',
    lightBg: 'from-emerald-50 to-green-50',
    icon: Calculator,
    description: 'Financial Planning'
  },
  educational: {
    color: 'from-purple-500 via-violet-600 to-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-500 via-violet-600 to-purple-600',
    lightBg: 'from-purple-50 to-violet-50',
    icon: GraduationCap,
    description: 'Learning & Education'
  },
  design: {
    color: 'from-pink-500 via-rose-600 to-pink-600',
    bgColor: 'bg-gradient-to-br from-pink-500 via-rose-600 to-pink-600',
    lightBg: 'from-pink-50 to-rose-50',
    icon: Palette,
    description: 'Design & Creative'
  },
  health: {
    color: 'from-red-500 via-rose-600 to-red-600',
    bgColor: 'bg-gradient-to-br from-red-500 via-rose-600 to-red-600',
    lightBg: 'from-red-50 to-rose-50',
    icon: Heart,
    description: 'Health & Wellness'
  },
  science: {
    color: 'from-indigo-500 via-blue-600 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-600',
    lightBg: 'from-indigo-50 to-blue-50',
    icon: Microscope,
    description: 'Science & Research'
  },
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
  const featuredCalculators = calculators.filter(calc => calc.featured)

  const handleCalculatorClick = (calculator: Calculator) => {
    if (calculator.requiresAuth) {
      setSelectedCalculator(calculator)
      setShowLoginModal(true)
      return
    }

    if (calculator.externalUrl) {
      window.open(calculator.externalUrl, '_blank')
    } else {
      window.location.href = `/calculators/${calculator.slug}`
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo Animation */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-500">
                  <Calculator className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="mb-6 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                Calculator
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Startsim.ai
              </span>
            </h1>
            
            {/* Subtitle with Stats */}
            <div className="mx-auto mb-10 max-w-4xl">
              <p className="text-2xl text-gray-600 leading-relaxed mb-8">
                Professional calculation tools for modern businesses and professionals
              </p>
              
              {/* Interactive Stats */}
              <div className="flex justify-center gap-8 mb-10">
                <div className="group text-center cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {calculators.length}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Calculators</div>
                </div>
                <div className="group text-center cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {categories.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Categories</div>
                </div>
                <div className="group text-center cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Free</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="mx-auto max-w-4xl mb-8">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-3xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative flex rounded-3xl bg-white/90 backdrop-blur-lg shadow-2xl shadow-blue-500/10 border border-white/20">
                  <div className="relative flex-1">
                    <Search className="absolute left-8 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search calculators, categories, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-l-3xl bg-transparent py-6 pl-16 pr-8 text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                    />
                  </div>
                  <button className="rounded-r-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-10 py-6 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium">
                    <Filter className="h-5 w-5" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Category Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-500/5">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105'
                  : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
              }`}
            >
              <Globe className="h-4 w-4" />
              All Tools
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {calculators.length}
              </span>
            </button>
            {categories.map((category) => {
              const count = calculators.filter(calc => calc.category === category).length
              const config = categoryConfig[category as keyof typeof categoryConfig]
              const Icon = config?.icon || Calculator
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${config?.color} text-white shadow-lg transform scale-105`
                      : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {config?.description || category}
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      {featuredCalculators.length > 0 && selectedCategory === 'all' && !searchQuery && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-700 font-semibold">Featured Tools</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Most Popular Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked tools trusted by thousands of professionals
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCalculators.slice(0, 6).map((calculator) => {
              const config = categoryConfig[calculator.category as keyof typeof categoryConfig]
              const Icon = config?.icon || Calculator
              
              return (
                <Card
                  key={calculator.id}
                  onClick={() => handleCalculatorClick(calculator)}
                  className="group relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-white via-white to-gray-50/50 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-4 hover:scale-[1.02]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${config?.lightBg || 'from-blue-50 to-indigo-50'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <CardHeader className="relative z-10 pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${config?.color || 'from-blue-500 to-purple-600'} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full">
                          <Star className="h-3 w-3 text-yellow-600 fill-current" />
                          <span className="text-xs font-bold text-yellow-700">Featured</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                      {calculator.name}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        {calculator.requiresAuth ? (
                          <div className="flex items-center gap-2 text-amber-600">
                            <Lock className="h-4 w-4" />
                            <span>Login Required</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
                            <Zap className="h-4 w-4" />
                            <span>Ready to Use</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <ArrowRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* All Calculators Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {selectedCategory === 'all' ? 'All Calculators' : `${categoryConfig[selectedCategory as keyof typeof categoryConfig]?.description || selectedCategory} Tools`}
            </h2>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        
        {filteredCalculators.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              
              const config = categoryConfig[calculator.category as keyof typeof categoryConfig]
              const Icon = config?.icon || Calculator
              
              return (
                <Card
                  key={calculator.id}
                  onClick={() => handleCalculatorClick(calculator)}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm overflow-hidden rounded-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${config?.lightBg || 'from-blue-50 to-indigo-50'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config?.bgColor || 'bg-gradient-to-br from-blue-500 to-purple-600'} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-1.5">
                        {calculator.featured && (
                          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                            <Star className="h-2.5 w-2.5 fill-current" />
                            Featured
                          </span>
                        )}
                        {calculator.requiresAuth && (
                          <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                            <Lock className="h-2.5 w-2.5" />
                            Login
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className="text-base font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                      {calculator.name}
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-3 text-sm text-gray-600 leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative z-10">
                    <div className="mb-4">
                      <span className={`inline-block rounded-full bg-gradient-to-r ${config?.color || 'from-blue-500 to-purple-600'} bg-opacity-10 px-3 py-1 text-xs font-medium capitalize`}>
                        {config?.description || calculator.category}
                      </span>
                    </div>
                    
                    {metadata.keywords && metadata.keywords.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {metadata.keywords.slice(0, 2).map((keyword: string, index: number) => (
                          <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        {calculator.requiresAuth ? (
                          <div className="flex items-center gap-1 text-amber-600">
                            <Shield className="h-3 w-3" />
                            <span>Sign in</span>
                          </div>
                        ) : calculator.externalUrl ? (
                          <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700">
                            <ExternalLink className="h-3 w-3" />
                            <span>Visit</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700">
                            <Calculator className="h-3 w-3" />
                            <span>Calculate</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="relative inline-flex">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 opacity-20 blur-xl" />
                <Search className="relative mx-auto h-16 w-16 text-gray-300" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No calculators found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn&apos;t find any calculators matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
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
