'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-2xl font-bold tracking-tight"
            >
              <Image
                src="/mind-elixir-cloud.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span>Mind Elixir</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Free-flowing Thoughts, AI-ignited Creative Sparks. A powerful,
              lightweight, and privacy-focused mind mapping tool.
            </p>
          </div>



          {/* Resources Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground tracking-tight">
              {t('resources')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://mind-elixir.com/blog/category/all"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('blog')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/SSShooter/mind-elixir-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Open Source Core
                </a>
              </li>
            </ul>
          </div>

          {/* Feedback & Legal Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground tracking-tight">
              {t('feedback')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:support@mind-elixir.com"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('emailUs')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/SSShooter/Mind-Elixir-Desktop-Release/issues"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('reportIssue')}
                </a>
              </li>
              <li>
                <a
                  href="https://mind-elixir.com/privacy"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a
                  href="https://mind-elixir.com/terms"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('termsOfService')}
                </a>
              </li>
            </ul>
          </div>

          {/* Other Products Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground tracking-tight">
              {t('otherProducts')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://mind-elixir.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('desktop')}
                </a>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/m10c-web-page-video-to-mi/ioadcalaliollffeejdkcncckkjieobp?hl=en-US&utm_source=mind-elixir-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('m10c')}
                </a>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t('cloud')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground tracking-tight">
              {t('followUs')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/SSShooter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/ssshooter_z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            © {currentYear} Mind Elixir. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
