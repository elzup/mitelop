import { useCallback, useEffect, useRef, useState } from 'react'

const CONFIG_SIZE = { w: 360, h: 680 }
const CONTROL_SIZE = { w: 380, h: 720 }

/** (key, instanceId) ごとに安定した window name。同名 open はブラウザが既存窓を再フォーカスする */
const configWindowName = (key: string, instanceId?: string) =>
  `mitelop-config-${key}-${instanceId ?? 'std'}`

const configWindowUrl = (key: string, instanceId?: string) =>
  `/config/${key}${instanceId ? `?instanceId=${instanceId}` : ''}`

/**
 * ガジェット設定窓 / コントロール窓を開く。
 * - 安定 window name によりブラウザ側で dedupe/再フォーカスされる (refresh 後も有効)
 * - 開いた Window ハンドルは追跡するが、開閉表示は best-effort (focus 時に掃除)
 * - window.open は必ずクリックハンドラから呼ぶこと (ポップアップブロッカ回避)
 */
export function useGadgetWindow() {
  const wins = useRef<Map<string, Window>>(new Map())
  const [openNames, setOpenNames] = useState<string[]>([])

  const sync = useCallback(() => {
    wins.current.forEach((w, name) => {
      if (w.closed) wins.current.delete(name)
    })
    setOpenNames([...wins.current.keys()])
  }, [])

  useEffect(() => {
    window.addEventListener('focus', sync)

    return () => window.removeEventListener('focus', sync)
  }, [sync])

  const openWindow = useCallback(
    (url: string, name: string, size: { w: number; h: number }) => {
      const win = window.open(
        url,
        name,
        `popup,width=${size.w},height=${size.h}`
      )

      if (win) {
        win.focus()
        wins.current.set(name, win)
        setOpenNames([...wins.current.keys()])
      }

      return win
    },
    []
  )

  const openConfigWindow = useCallback(
    (key: string, instanceId?: string) =>
      openWindow(
        configWindowUrl(key, instanceId),
        configWindowName(key, instanceId),
        CONFIG_SIZE
      ),
    [openWindow]
  )

  const openControlWindow = useCallback(
    () => openWindow('/broadcast/control', 'mitelop-bc-control', CONTROL_SIZE),
    [openWindow]
  )

  const isConfigOpen = useCallback(
    (key: string, instanceId?: string) =>
      openNames.includes(configWindowName(key, instanceId)),
    [openNames]
  )

  return { openConfigWindow, openControlWindow, isConfigOpen }
}
