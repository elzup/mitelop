import { useEffect } from 'react'
import { isTauri } from '../../utils/platform'

export const useDocumentTitle = (title: string | undefined) => {
  useEffect(() => {
    if (!title) return

    document.title = title
    // Tauri の装飾窓はネイティブタイトルが document.title に自動追従しないので明示同期
    if (isTauri()) {
      void import('@tauri-apps/api/window').then(({ getCurrentWindow }) =>
        getCurrentWindow().setTitle(`Mitelop — ${title}`)
      )
    }
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
