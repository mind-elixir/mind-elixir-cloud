const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://cloud.mind-elixir.com'

export function generateI18nAlternates(path: string) {
  const canonicalUrl = `${BASE_URL}${path}`

  return {
    canonical: canonicalUrl,
    languages: {
      en: `${BASE_URL}/en${path}`,
      'zh-CN': `${BASE_URL}/cn${path}`,
      ja: `${BASE_URL}/ja${path}`,
      'x-default': canonicalUrl,
    },
  }
}
