import { useParams } from '@tanstack/react-router'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import { isMac, isTauri } from '../utils/platform'
import { tokens } from '../utils/tokens'
import { useLocalStorage } from '../utils/useLocalStorage'
import { useGadgetWindow } from './Broadcast/useGadgetWindow'
import { useTransparentBody } from './Broadcast/useTauriOverlay'
import { GadgetChrome } from './GadgetChrome'
import { gadgetMap } from './gadgets'
import { GadgetWindowContext } from './gadgetWindowContext'
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
  const def = gadgetKey ? gadgetMap[gadgetKey] : undefined
  const { openConfigWindow, closeConfigWindow } = useGadgetWindow()
  // 全ガジェット共通の透過度 (設定窓のスライダーと同じキー)
  const [opacity] = useLocalStorage<number>(`config-opacity-${gadgetKey}`, 1)

  useTransparentBody(true)

  if (!def) return <Unknown>unknown gadget: {String(gadgetKey)}</Unknown>

  const Component = def.Component
  const hasConfig = Boolean(def.config)

  return (
    <Root>
      <Bar
        title={def.title}
        icon={def.icon}
        mac={isMac()}
        onClose={() => {
          // 本体を閉じるとき、開いている関連設定窓も一緒に閉じる
          if (hasConfig) closeConfigWindow(def.key)
          void closeSelf()
        }}
        onConfig={hasConfig ? () => openConfigWindow(def.key) : undefined}
        dragProps={{ 'data-tauri-drag-region': true }}
      />
      <Body style={{ opacity } as CSSProperties}>
        <GadgetWindowContext.Provider value>
          <Component windowMode={def.windowMode} />
        </GadgetWindowContext.Provider>
      </Body>
      <ResizeGrip />
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
