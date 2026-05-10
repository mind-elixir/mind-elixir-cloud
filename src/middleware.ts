import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales as unknown as string[],

  // Used when no locale matches
  defaultLocale: defaultLocale
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(cn|ja|en|es)/:path*', '/((?!api|_next|_vercel|share|.*\\..*).*)']
};
