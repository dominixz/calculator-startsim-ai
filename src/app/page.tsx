'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { URLParamsHandler } from '@/components/URLParamsHandler'
import { 
  Search, 
  Filter, 
  Calculator, 
  ExternalLink, 
  Shield, 
  Lock, 
  Star,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Palette,
  Heart,
  Microscope,
  Building2,
  PiggyBank,
  BookOpen,
  Paintbrush,
  Activity,
  TestTube,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/ui/LoginModal'
import { Toast } from '@/components/ui/Toast'
import { SocialShare } from '@/components/SocialShare'

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

const categoryIcons = {
  business: TrendingUp,
  financial: DollarSign,
  educational: GraduationCap,
  design: Palette,
  health: Heart,
  science: Microscope,
} as const

// Function to get specific icon based on calculator name/type
const getCalculatorIcon = (calculator: Calculator) => {
  const name = calculator.name.toLowerCase()
  const category = calculator.category as keyof typeof categoryIcons
  
  // Specific calculator type icons
  if (name.includes('price') || name.includes('selling')) return Building2
  if (name.includes('profit') || name.includes('business')) return TrendingUp
  if (name.includes('money') || name.includes('compound') || name.includes('growth')) return PiggyBank
  if (name.includes('svg') || name.includes('image') || name.includes('design')) return Paintbrush
  if (name.includes('health') || name.includes('medical')) return Activity
  if (name.includes('science') || name.includes('research')) return TestTube
  if (name.includes('education') || name.includes('learning')) return BookOpen
  
  // Fallback to category icon
  return categoryIcons[category] || Calculator
}

export default function HomePage() {
  const { data: session, status } = useSession()
  const [calculators, setCalculators] = useState<Calculator[]>([])
  const [filteredCalculators, setFilteredCalculators] = useState<Calculator[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null)
  const [showWelcomeToast, setShowWelcomeToast] = useState(false)
  const [showLogoutToast, setShowLogoutToast] = useState(false)
  const [hasShownToast, setHasShownToast] = useState(false)

  // Handle logout success from URL params
  const handleLogoutSuccess = () => {
    setShowLogoutToast(true)
  }

  // Show welcome toast when user logs in
  useEffect(() => {
    if (session?.user && status === 'authenticated' && !hasShownToast) {
      setShowWelcomeToast(true)
      setHasShownToast(true)
    }
  }, [session, status, hasShownToast])

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
    // If calculator requires auth and user is not logged in, show login modal
    if (calculator.requiresAuth && !session?.user) {
      setSelectedCalculator(calculator)
      setShowLoginModal(true)
      return
    }

    // User is logged in or calculator doesn't require auth - proceed to calculator
    if (calculator.externalUrl) {
      window.open(calculator.externalUrl, '_blank')
    } else {
      window.location.href = `/calculators/${calculator.slug}`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-2xl animate-pulse" />
              <div className="relative h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Loading calculators...
          </h2>
          <p className="mt-2 text-gray-500">Preparing your tools</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      {/* URL Parameters Handler */}
      <Suspense fallback={null}>
        <URLParamsHandler onLogoutSuccess={handleLogoutSuccess} />
      </Suspense>
      
      {/* Simple but Beautiful Header */}
      <div className="relative bg-gradient-to-r from-white via-blue-50/30 to-white border-b border-blue-100/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Clean Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl shadow-blue-500/20 transform hover:scale-105 transition-all duration-300">
                  <Calculator className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            
            {/* Clean Title */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl text-gray-900">
              Calculator.Startsim.AI
            </h1>
            
            {/* Simple Subtitle */}
            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 leading-relaxed">
              Professional calculation tools for every need
            </p>

            {/* Beautiful Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative flex rounded-2xl bg-white shadow-xl shadow-blue-500/10 border border-blue-100/50">
                  <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search calculators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-l-2xl bg-transparent py-5 pl-14 pr-6 text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                    />
                  </div>
                  <button className="rounded-r-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="mt-8 flex justify-center">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                <SocialShare />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Category Filter */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
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
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Welcome Banner for Logged In Users */}
      {session?.user && (
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-6 shadow-xl">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Welcome back, {session.user.name?.split(' ')[0] || 'User'}! 
                  </h3>
                  <p className="text-emerald-100">
                    You&apos;re logged in and ready to access all premium calculators
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium text-white bg-white/20 px-3 py-1 rounded-full">
                  Premium Access
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredCalculators.length} of {calculators.length} calculators
        </p>

        {/* Beautiful Calculator Grid */}
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
              const categoryColor = categoryColors[calculator.category as keyof typeof categoryColors] || 'bg-gradient-to-br from-gray-500 to-gray-600'
              const IconComponent = getCalculatorIcon(calculator)
              
              return (
                <Card 
                  key={calculator.id} 
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm overflow-hidden rounded-2xl"
                  onClick={() => handleCalculatorClick(calculator)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${categoryColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-1.5">
                        {calculator.featured && (
                          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </span>
                        )}
                        {calculator.requiresAuth && (
                          session?.user ? (
                            <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                              <CheckCircle className="h-3 w-3" />
                              Unlocked
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
                              <Lock className="h-3 w-3" />
                              Login
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {calculator.name}
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-3 text-sm text-gray-600 leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative z-10">
                    <div className="mb-4">
                      <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 capitalize">
                        {calculator.category}
                      </span>
                    </div>
                    
                    {metadata.keywords && metadata.keywords.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {metadata.keywords.slice(0, 2).map((keyword: string, index: number) => (
                          <span key={index} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        {calculator.requiresAuth ? (
                          <div className="flex items-center gap-1 text-amber-600">
                            <Shield className="h-4 w-4" />
                            <span>Sign in</span>
                          </div>
                        ) : calculator.externalUrl ? (
                          <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700">
                            <ExternalLink className="h-4 w-4" />
                            <span>Visit</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700">
                            <Calculator className="h-4 w-4" />
                            <span>Use</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <Search className="mx-auto h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No calculators found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Clear Filters
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

      {/* Welcome Toast */}
      {showWelcomeToast && (
        <Toast
          message={`Welcome back, ${session?.user?.name?.split(' ')[0] || 'User'}! You're now logged in.`}
          type="success"
          onClose={() => setShowWelcomeToast(false)}
        />
      )}

      {/* Logout Success Toast */}
      {showLogoutToast && (
        <Toast
          message="You've been successfully logged out. Thanks for using Calculator Startsim.ai!"
          type="success"
          onClose={() => setShowLogoutToast(false)}
        />
      )}
    </div>
  )
}
