'use client'

import React from 'react'
import { X, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  calculatorName: string
  calculatorDescription: string
}

export function LoginModal({ isOpen, onClose, calculatorName, calculatorDescription }: LoginModalProps) {
  if (!isOpen) return null

  const handleSignIn = () => {
    // For demo purposes, we'll just redirect to a generic login page
    // In a real app, you'd integrate with NextAuth.js or your auth provider
    alert('This would redirect to your authentication system (NextAuth.js, Auth0, etc.)')
    onClose()
  }

  const handleSignUp = () => {
    alert('This would redirect to your registration system')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <Lock className="h-8 w-8 text-yellow-600" />
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-xl">Login Required</CardTitle>
          <CardDescription>
            Sign in to access <strong>{calculatorName}</strong>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Premium Tool</h4>
                <p className="text-sm text-blue-700 mt-1">
                  {calculatorDescription}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button onClick={handleSignIn} className="w-full">
              Sign In to Continue
            </Button>
            <Button onClick={handleSignUp} variant="outline" className="w-full">
              Create Free Account
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Free account • No credit card required
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
