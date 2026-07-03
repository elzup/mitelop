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
 * CssBaseline が塗る body 背景を透過に上書きする (Tauri 透過ウィンドウで背後が抜ける)。
 * stage 窓・単独ガジェット窓・ランチャーなど、透過で浮かせたい窓で使う。
 * enabled=false (透過が無意味なガジェット) や web では何もしない。
 */
export function useTransparentBody(enabled = true) {
  useEffect(() => {
    if (!isTauri() || !enabled) return
    const el = document.body
    const prev = el.style.background

    el.style.background = 'transparent'

    return () => {
      el.style.background = prev
    }
  }, [enabled])
}

/**
 * stage 窓に Tauri のオーバーレイ挙動を適用する。
 * - body 背景を透過に (useTransparentBody)
 * - コントロール窓で切り替えた 最前面/クリックスルー を自ウィンドウへ反映
 * web では何もしない。
 */
export function useTauriOverlay() {
  const [overlay] = useOverlayConfig()

  useTransparentBody()

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
