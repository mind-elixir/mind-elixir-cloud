'use client'

import { useTranslations } from 'next-intl'
import {
  Cloud,
  Globe,
  Sparkles,
  Share2,
  Download,
  ArrowLeftRight,
} from 'lucide-react'

export default function AboutPage() {
  const t = useTranslations('about')

  const features = [
    { key: 'cloudSync', icon: Cloud },
    { key: 'webBased', icon: Globe },
    { key: 'publicSharing', icon: Share2 },
    { key: 'multiFormat', icon: Download },
    { key: 'dataFlow', icon: ArrowLeftRight },
  ]

  return (
    <div className="min-h-screen pt-28 px-8 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-2xl text-muted-foreground mb-6">{t('subtitle')}</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('intro')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mb-16 p-8 rounded-lg bg-muted/50 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t('comparison.title')}
          </h2>
          <p className="text-lg text-center text-muted-foreground">
            {t('comparison.description')}
          </p>
        </div>


      </div>
    </div>
  )
}
