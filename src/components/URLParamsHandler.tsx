'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface URLParamsHandlerProps {
  onLogoutSuccess: () => void
}

export function URLParamsHandler({ onLogoutSuccess }: URLParamsHandlerProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const loggedOut = searchParams.get('logout')
    if (loggedOut === 'success') {
      onLogoutSuccess()
      // Remove the logout parameter from URL after showing toast
      const url = new URL(window.location.href)
      url.searchParams.delete('logout')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams, onLogoutSuccess])

  return null
}
