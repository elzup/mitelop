import { useEffect } from 'react'

export const useDocumentTitle = (title: string | undefined) => {
  useEffect(() => {
    if (!title) return

    document.title = title
  }, [title])
}

export const useThemeColor = (color: string | undefined) => {
  useEffect(() => {
    if (!color) return

    const selector = 'meta[name="theme-color"]'
    const existingMeta = document.querySelector<HTMLMetaElement>(selector)
    const meta = existingMeta ?? document.createElement('meta')

    meta.name = 'theme-color'
    meta.content = color

    if (!existingMeta) {
      document.head.appendChild(meta)
    }
  }, [color])
}
