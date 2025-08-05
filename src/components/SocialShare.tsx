'use client'

import { useState } from 'react'
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SocialShareProps {
  title?: string
  description?: string
  url?: string
}

export function SocialShare({ 
  title = "Calculator Startsim.AI - Business Calculator Hub",
  description = "Comprehensive business calculator portal with premium financial tools",
  url 
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  
  const shareData = {
    title,
    text: description,
    url: shareUrl,
  }

  const handleNativeShare = async () => {
    if (typeof window !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.log('Error copying:', error)
    }
  }

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  return (
    <div className="flex items-center space-x-2">
      {/* Native Share (Mobile) */}
      {typeof window !== 'undefined' && 'share' in navigator && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="flex items-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      )}

      {/* Facebook */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(facebookUrl, '_blank', 'width=600,height=400')}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      {/* Twitter */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(twitterUrl, '_blank', 'width=600,height=400')}
        className="flex items-center space-x-2 text-sky-500 hover:text-sky-600"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      {/* LinkedIn */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(linkedinUrl, '_blank', 'width=600,height=400')}
        className="flex items-center space-x-2 text-blue-700 hover:text-blue-800"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      {/* Copy Link */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center space-x-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </>
        )}
      </Button>
    </div>
  )
}
