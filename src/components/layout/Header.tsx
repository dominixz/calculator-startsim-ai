'use client'

import Link from 'next/link'
import { Calculator, Menu, Github, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoutModal } from '@/components/ui/LogoutModal'
import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { data: session, status } = useSession()

  const handleGitHubLogin = () => {
    signIn('github')
  }

  const handleSignOut = () => {
    setShowLogoutModal(true)
  }

  return (
    <header className="border-b border-gray-200/50 bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-105 transition-all duration-300">
                <Calculator className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calculator.Startsim.AI
            </span>
          </Link>

          {/* Navigation - Remove for cleaner homepage focus */}
          {/* <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/calculators"
              className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium relative group"
            >
              Calculators
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav> */}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
            ) : session?.user ? (
              <div className="flex items-center space-x-3">
                {/* Status Indicator */}
                <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full px-3 py-1 border border-emerald-200/50">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-emerald-700">Logged In</span>
                </div>
                
                <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-4 py-2 border border-blue-200/50">
                  {session.user.image && (
                    <div className="relative">
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-blue-200"
                      />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-900">
                    {session.user.name}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-xl px-4 py-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleGitHubLogin}
                className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Github className="h-4 w-4" />
                Sign in with GitHub
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/calculators"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Calculators
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {session?.user ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 px-2">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="h-6 w-6 rounded-full"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                      className="flex items-center gap-2 justify-start"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      handleGitHubLogin()
                      setIsOpen(false)
                    }}
                    className="flex items-center gap-2 justify-start"
                  >
                    <Github className="h-4 w-4" />
                    Sign in with GitHub
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </header>
  )
}
