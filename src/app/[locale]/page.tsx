'use client'

import NavBar from '@/components/NavBar'
import { MindMap } from '@/components/ui/mindmap'
import { desktopFeaturesData } from '@/data/desktopFeatures'
import { useTranslations } from 'next-intl'
import { Globe, Share2, Download, ArrowLeftRight } from 'lucide-react'
import { AuroraText } from '@/components/ui/ui/aurora-text'

export default function HomePage() {
  const t = useTranslations('home')
  const tFeatures = useTranslations('about.features')
  const tComparison = useTranslations('about.comparison')

  const features = [
    { key: 'webBased', icon: Globe },
    { key: 'publicSharing', icon: Share2 },
    { key: 'multiFormat', icon: Download },
    { key: 'dataFlow', icon: ArrowLeftRight },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 p-5">
        <NavBar className="max-w-7xl mx-auto" />
      </div>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('title')}</h1>
          <AuroraText className="text-2xl md:text-3xl mb-4">
            {t('subtitle')}
          </AuroraText>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('intro')}
          </p>
        </div>

        {/* Mind Map Section */}
        <div className="w-full md:w-[90%] aspect-video mx-auto rounded-lg border border-border bg-card shadow-lg overflow-hidden mb-20">
          <MindMap className="h-full w-full" data={desktopFeaturesData} />
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {tFeatures('title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {tFeatures(`${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {tFeatures(`${key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="p-8 rounded-lg bg-muted/50 border border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              {tComparison('title')}
            </h2>
            <p className="text-lg text-center text-muted-foreground">
              {tComparison('description')}
            </p>
          </div>
        </div>


      </div>
    </div>
  )
}
