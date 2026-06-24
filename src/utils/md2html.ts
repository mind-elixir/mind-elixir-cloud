import { marked, Tokens } from 'marked'
import 'katex/dist/katex.min.css'
import katex from 'katex'
import 'katex/dist/contrib/mhchem'

export const md2html = (text: string) => {
  if (!text) return ''
  try {
    const renderer = {
      strong(token: Tokens.Strong) {
        let color = ''
        let content = token.text
        if (token.text.startsWith('%:')) {
          const text = token.text.slice(2)
          const colonIndex = text.indexOf(':')
          if (colonIndex > 0) {
            color = text.slice(0, colonIndex)
            content = text.slice(colonIndex + 1)
          }
        }
        if (token.raw.startsWith('__')) {
          return `<strong class="underscore" style="background-color: ${color};">${content}</strong>`
        }
        return `<strong class="asterisk" style="color: ${color};">${content}</strong>`
      },
      link(token: Tokens.Link) {
        const href = token.href || ''
        const title = token.title ? ` title="${token.title}"` : ''
        const text = token.text || ''
        return `<a href="${href}"${title} target="_blank">${text}</a>`
      },
    }

    // Handle display math ($$...$$)
    text = text.replace(/\$\$([^$]+)\$\$/g, (_, math) => {
      return katex.renderToString(math.trim(), { displayMode: true, output: 'html' })
    })

    // Handle inline math ($...$)
    text = text.replace(/\$([^$]+)\$/g, (_, math) => {
      return katex.renderToString(math.trim(), { displayMode: false, output: 'html' })
    })

    marked.use({ renderer, gfm: true })
    const html = marked(text) as string
    return html.trim()
  } catch (error) {
    console.log('md2html error', error)
    return text
  }
}
