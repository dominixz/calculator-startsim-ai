import Link from 'next/link'
import { Calculator } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Calculator className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Calculator.Startsim.AI</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Your comprehensive business calculator portal. Calculate everything from loans to taxes with ease.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculators/loan" className="text-gray-600 hover:text-gray-900">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/mortgage" className="text-gray-600 hover:text-gray-900">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/investment" className="text-gray-600 hover:text-gray-900">
                  Investment Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/tax" className="text-gray-600 hover:text-gray-900">
                  Tax Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/financial" className="text-gray-600 hover:text-gray-900">
                  Financial
                </Link>
              </li>
              <li>
                <Link href="/categories/business" className="text-gray-600 hover:text-gray-900">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/categories/personal" className="text-gray-600 hover:text-gray-900">
                  Personal
                </Link>
              </li>
              <li>
                <Link href="/categories/investment" className="text-gray-600 hover:text-gray-900">
                  Investment
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mt-8">
          <p className="text-center text-gray-600 text-sm">
            © 2025 Calculator.Startsim.AI All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
