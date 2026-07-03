import { useEffect } from 'react'
import { isTauri } from '../../utils/platform'
import { useLocalStorage } from '../../utils/useLocalStorage'

export type OverlayConfig = {
  /** クリックを下のアプリへ素通しする (操作はコントロール窓から) */
  clickThrough: boolean
  alwaysOnTop: boolean
}

const overlayDefault: OverlayConfig = {
  clickThrough: false,
  alwaysOnTop: false,
}

/** overlay フラグ (Tauri 専用) をウィンドウ間で同期する */
export function useOverlayConfig() {
  return useLocalStorage<OverlayConfig>('broadcast-overlay', overlayDefault)
}

/**
 * stage 窓に Tauri のオーバーレイ挙動を適用する。
 * - CssBaseline が塗る body 背景を透過に上書き (透過ウィンドウで背後が抜ける)
 * - コントロール窓で切り替えた 最前面/クリックスルー を自ウィンドウへ反映
 * web では何もしない。
 */
export function useTauriOverlay() {
  const [overlay] = useOverlayConfig()

  useEffect(() => {
    if (!isTauri()) return
    const el = document.body
    const prev = el.style.background

    el.style.background = 'transparent'

    return () => {
      el.style.background = prev
    }
  }, [])

  useEffect(() => {
    if (!isTauri()) return
    void (async () => {
      const { getCurrentWindow } = await import('@tauri-apps/api/window')
      const win = getCurrentWindow()

      await win.setAlwaysOnTop(overlay.alwaysOnTop)
      await win.setIgnoreCursorEvents(overlay.clickThrough)
    })()
  }, [overlay.alwaysOnTop, overlay.clickThrough])
}
