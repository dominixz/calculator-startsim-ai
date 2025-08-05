import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculator-startsim-ai.vercel.app'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Calculator pages
  const calculatorPages = [
    'loan',
    'selling-price',
    'conversion-pricing',
    'one-dollar-simulation',
    'text-to-image',
    'life-calculator',
    'unit-value-comparison',
    'churn-rate-calculator',
    'emergency-fund-calculator',
    'budget-calculator-advanced',
    'youtube-ai-summarizer',
    'retirement-savings',
  ].map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...calculatorPages]
}
