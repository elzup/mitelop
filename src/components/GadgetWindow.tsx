import { useParams, useSearch } from '@tanstack/react-router'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { isMac, isTauri } from '../utils/platform'
import { tokens } from '../utils/tokens'
import { useLocalStorage } from '../utils/useLocalStorage'
import { useGadgetWindow } from './Broadcast/useGadgetWindow'
import { useTransparentBody } from './Broadcast/useTauriOverlay'
import { GadgetChrome } from './GadgetChrome'
import { gadgetMap } from './gadgets'
import { GadgetWindowContext } from './gadgetWindowContext'
import { SlotOverrideContext } from './hooks/slotOverride'
import { deleteSlot } from './hooks/useSlots'
import { ResizeGrip } from './ResizeGrip'

/** 自ウィンドウを閉じる (Tauri / web 両対応) */
async function closeSelf() {
  if (isTauri()) {
    const { getCurrentWindow } = await import('@tauri-apps/api/window')

    await getCurrentWindow().close()

    return
  }
  window.close()
}

/**
 * ネイティブのランチャーから開く「ガジェット単体の枠なし透過窓」。
 * OS のヘッダーは無し。上部の細いバー (ホバーで濃くなる) がドラッグ + 設定 + 閉じる。
 * バーは GadgetChrome (ボード枠と共通) を使う。Tool 内のホバー ⚙ は context で抑止する。
 */
function GadgetWindow() {
  const { gadgetKey } = useParams({ strict: false })
  const search = useSearch({ strict: false })
  const slot =
    'slot' in search && typeof search.slot === 'string' ? search.slot : null
  const def = gadgetKey ? gadgetMap[gadgetKey] : undefined
  const {
    openConfigWindow,
    closeConfigWindow,
    openInstanceConfig,
    closeInstanceConfig,
  } = useGadgetWindow()
  // 透過度はインスタンス (slot) 単位。slot 無し (設定なしガジェット) はキー単位
  const opacityKey = slot
    ? `config-opacity-${gadgetKey}-${slot}`
    : `config-opacity-${gadgetKey}`
  const [opacity] = useLocalStorage<number>(opacityKey, 1)
  // close 時に中身を隠して、slot 片付けによるフォールバック再描画のチラつきを防ぐ
  const [closing, setClosing] = useState(false)
  // Cmd/Ctrl+W から最新の onClose を呼ぶための ref (early return の前に登録が要る)
  const closeRef = useRef<() => void>(() => {})

  const fixedSize = Boolean(def?.fixedSize)

  useTransparentBody(true)

  // アス比が要のガジェット (Frame 等) は窓を非リサイズにして比率を守る
  useEffect(() => {
    if (!isTauri() || !fixedSize) return

    void import('@tauri-apps/api/window').then(({ getCurrentWindow }) =>
      getCurrentWindow().setResizable(false)
    )
  }, [fixedSize])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'w') {
        e.preventDefault()
        closeRef.current()
      }
    }

    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!def) return <Unknown>unknown gadget: {String(gadgetKey)}</Unknown>

  const Component = def.Component
  const hasConfig = Boolean(def.config)

  const onClose = () => {
    // 中身を先に隠してから後始末 (フォールバック slot のチラつきを出さない)
    setClosing(true)
    if (slot) {
      closeInstanceConfig(def.key, slot)
      deleteSlot(def.key, slot)
    } else if (hasConfig) {
      closeConfigWindow(def.key)
    }
    void closeSelf()
  }

  closeRef.current = onClose
  const onConfig = hasConfig
    ? () =>
        slot ? openInstanceConfig(def.key, slot) : openConfigWindow(def.key)
    : undefined

  return (
    <Root>
      <Bar
        title={def.title}
        icon={def.icon}
        mac={isMac()}
        onClose={onClose}
        onConfig={onConfig}
        dragProps={{ 'data-tauri-drag-region': true }}
      />
      <Body style={{ opacity } as CSSProperties}>
        {!closing && (
          <GadgetWindowContext.Provider value>
            <SlotOverrideContext.Provider value={slot}>
              <Component windowMode={def.windowMode} />
            </SlotOverrideContext.Provider>
          </GadgetWindowContext.Provider>
        )}
      </Body>
      {!fixedSize && <ResizeGrip />}
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const Bar = styled(GadgetChrome)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.12s;

  ${Root}:hover & {
    opacity: 1;
  }
`
const Body = styled.div`
  width: 100%;
  height: 100%;
`
const Unknown = styled.div`
  padding: 16px;
  color: ${tokens.color.text};
`

export default GadgetWindow
