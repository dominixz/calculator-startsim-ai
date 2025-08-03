'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Calculator, ExternalLink, Lock, Sparkles, TrendingUp, Zap, Star } from 'lucide-react'
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
  [key: string]: unknown
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

  const safeParseMetadata = (metadata: any): CalculatorMetadata => {
    try {
      if (typeof metadata === 'string') {
        return JSON.parse(metadata)
      } else if (typeof metadata === 'object' && metadata !== null) {
        return metadata
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
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              // Loading skeleton
              [...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-xl"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-full"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-4/5"></div>
                      <div className="h-10 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg mt-4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredCalculators.map((calculator) => {
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
                const categoryColor = categoryColors[calculator.category as keyof typeof categoryColors] || 'bg-gray-500'
                
                return (
                  <Card 
                    key={calculator.id} 
                    className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative"
                    onClick={() => handleCalculatorClick(calculator)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${categoryColor} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          <Calculator className="h-7 w-7 text-white" />
                        </div>
                        {calculator.requiresAuth && (
                          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 text-xs font-medium text-yellow-800 border border-yellow-200 shadow-sm">
                            <Shield className="h-3 w-3" />
                            Login Required
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                        {calculator.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-gray-600">
                        {calculator.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {metadata.keywords?.slice(0, 3).map((keyword: string, index: number) => (
                          <span key={index} className="inline-flex items-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200 shadow-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                        {calculator.requiresAuth ? 'Sign in to access' : calculator.externalUrl ? 'Visit Calculator' : 'Use Calculator'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200">
              <Link href="/calculators">
                View All {featuredCalculators.length > 0 ? `${featuredCalculators.length}+` : ''} Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent sm:text-4xl">
              Why Choose Our Calculators?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by professionals worldwide for accurate, reliable calculations
            </p>
            <div className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center group">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">Lightning Fast</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Get instant results with our optimized calculation engines. No waiting, no delays.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent">100% Secure</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Your data is protected with enterprise-grade security. We never store sensitive information.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">Expert Verified</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                All calculations are verified by industry experts and updated regularly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of professionals using our calculators daily
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <Link href="/calculators">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <Star className="mr-2 h-5 w-5" />
                View Popular
              </Button>
            </div>
          </div>
        </div>
      </section>

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
