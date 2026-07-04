import { useCallback, useEffect, useRef, useState } from 'react'
import { isTauri } from '../../utils/platform'
import { gadgetDefaultSize } from '../gadgets'

const CONFIG_SIZE = { w: 360, h: 680 }
const CONTROL_SIZE = { w: 380, h: 720 }
const BOARD_SIZE = { w: 1280, h: 760 }

/** 枠なし透過 (ガジェット単体 / ボード) か、通常の装飾窓 (設定 / コントロール) か */
type WinOpts = {
  transparent?: boolean
  decorations?: boolean
  /** 呼び出し元 (ガジェット) 窓の右隣に、被らないよう配置する */
  beside?: boolean
}

/** 呼び出し元窓の右隣 (論理座標) を返す。取得に失敗したら undefined。 */
async function besidePosition(): Promise<{ x: number; y: number } | undefined> {
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window')
    const cur = getCurrentWindow()
    const [pos, size, scale] = await Promise.all([
      cur.outerPosition(),
      cur.outerSize(),
      cur.scaleFactor(),
    ])

    return { x: (pos.x + size.width) / scale + 8, y: pos.y / scale }
  } catch {
    return undefined
  }
}

/**
 * Tauri ではブラウザの window.open が使えない (別 WebView になり localStorage も
 * 分かれる) ので、同一アプリ内の WebviewWindow として開く。同 label は再フォーカス。
 */
async function openTauriWindow(
  url: string,
  label: string,
  size: { w: number; h: number },
  opts?: WinOpts
) {
  const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow')
  const existing = await WebviewWindow.getByLabel(label)

  if (existing) {
    await existing.setFocus()

    return
  }
  const pos = opts?.beside ? await besidePosition() : undefined

  // eslint-disable-next-line no-new
  new WebviewWindow(label, {
    url,
    width: size.w,
    height: size.h,
    transparent: opts?.transparent,
    decorations: opts?.decorations,
    ...(pos ? { x: pos.x, y: pos.y } : {}),
  })
}

const withParams = (
  path: string,
  params: Record<string, string | undefined>
) => {
  const qs = Object.entries(params)
    .filter(([, v]) => v)
    .map(([key, v]) => `${key}=${encodeURIComponent(v as string)}`)
    .join('&')

  return qs ? `${path}?${qs}` : path
}

/** main ボードは URL パラメータを省いて既存挙動を保つ */
const boardParam = (boardId: string) =>
  boardId === 'main' ? undefined : boardId

/** (key, instanceId, boardId) ごとに安定した window name。同名 open は既存窓を再フォーカス */
const configWindowName = (key: string, instanceId?: string, boardId = 'main') =>
  `mitelop-config-${key}-${instanceId ?? 'std'}-${boardId}`

const configWindowUrl = (key: string, instanceId?: string, boardId = 'main') =>
  withParams(`/config/${key}`, { instanceId, board: boardParam(boardId) })

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
    (
      url: string,
      name: string,
      size: { w: number; h: number },
      opts?: WinOpts
    ) => {
      if (isTauri()) {
        void openTauriWindow(url, name, size, opts)
        // Tauri 側の開閉追跡は行わない (開く操作は label dedupe に任せる)
        setOpenNames((v) => (v.includes(name) ? v : [...v, name]))

        return null
      }

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
    (key: string, instanceId?: string, boardId = 'main') =>
      openWindow(
        configWindowUrl(key, instanceId, boardId),
        configWindowName(key, instanceId, boardId),
        CONFIG_SIZE,
        { beside: true }
      ),
    [openWindow]
  )

  /** 対応する設定窓が開いていれば閉じる (本体ガジェット窓を閉じるときの後始末)。 */
  const closeConfigWindow = useCallback(
    (key: string, instanceId?: string, boardId = 'main') => {
      const name = configWindowName(key, instanceId, boardId)

      if (isTauri()) {
        void (async () => {
          const { WebviewWindow } = await import(
            '@tauri-apps/api/webviewWindow'
          )
          const win = await WebviewWindow.getByLabel(name)

          await win?.close()
        })()

        return
      }

      const win = wins.current.get(name)

      if (win) {
        win.close()
        wins.current.delete(name)
        setOpenNames([...wins.current.keys()])
      }
    },
    []
  )

  const openControlWindow = useCallback(
    (boardId = 'main') =>
      openWindow(
        withParams('/broadcast/control', { board: boardParam(boardId) }),
        `mitelop-bc-control-${boardId}`,
        CONTROL_SIZE
      ),
    [openWindow]
  )

  /**
   * ガジェット単体を枠なし透過窓で浮かべる (ネイティブのランチャーから)。
   * 透過度は各ガジェット共通のスライダーで調整する。
   */
  const openGadgetWindow = useCallback(
    (key: string) => {
      const size = gadgetDefaultSize(key)

      return openWindow(
        `/gadget/${key}`,
        `mitelop-gadget-${key}`,
        { w: size.width, h: size.height },
        { transparent: true, decorations: false }
      )
    },
    [openWindow]
  )

  /** 他ガジェットを載せるボード (broadcast stage) を開く。枠 (window border) は残す */
  const openBoardWindow = useCallback(
    (boardId = 'main') =>
      openWindow(
        withParams('/broadcast', { board: boardParam(boardId) }),
        `mitelop-board-${boardId}`,
        BOARD_SIZE,
        { transparent: true, decorations: true }
      ),
    [openWindow]
  )

  const isConfigOpen = useCallback(
    (key: string, instanceId?: string, boardId = 'main') =>
      openNames.includes(configWindowName(key, instanceId, boardId)),
    [openNames]
  )

  return {
    openConfigWindow,
    closeConfigWindow,
    openControlWindow,
    openGadgetWindow,
    openBoardWindow,
    isConfigOpen,
  }
}
