import { IconButton } from '@material-ui/core'
import { Close, Settings } from '@material-ui/icons'
import { useParams } from '@tanstack/react-router'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import { isMac, isTauri } from '../utils/platform'
import { tokens } from '../utils/tokens'
import { useLocalStorage } from '../utils/useLocalStorage'
import { useGadgetWindow } from './Broadcast/useGadgetWindow'
import { useTransparentBody } from './Broadcast/useTauriOverlay'
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
 * 設定 ⚙ は header 側に置き、Tool 内のホバー ⚙ は context で抑止する (二重表示回避)。
 */
function GadgetWindow() {
  const { gadgetKey } = useParams({ strict: false })
  const def = gadgetKey ? gadgetMap[gadgetKey] : undefined
  const { openConfigWindow } = useGadgetWindow()
  // 全ガジェット共通の透過度 (設定窓のスライダーと同じキー)
  const [opacity] = useLocalStorage<number>(`config-opacity-${gadgetKey}`, 1)

  useTransparentBody(true)

  if (!def) return <Unknown>unknown gadget: {String(gadgetKey)}</Unknown>

  const Component = def.Component
  const hasConfig = Boolean(def.config)

  return (
    <Root>
      <Bar data-mac={isMac()}>
        <DragZone data-tauri-drag-region>{def.title}</DragZone>
        {hasConfig && (
          <IconButton
            className="config"
            size="small"
            title="設定を別窓で開く"
            onClick={() => openConfigWindow(def.key)}
          >
            <Settings fontSize="small" />
          </IconButton>
        )}
        <IconButton
          className="close"
          size="small"
          onClick={() => void closeSelf()}
        >
          <Close fontSize="small" />
        </IconButton>
      </Bar>
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
const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 28px;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.12s;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;

  ${Root}:hover & {
    opacity: 1;
  }
  .MuiIconButton-root {
    color: #fff;
    padding: 4px;
  }
  .MuiSvgIcon-root {
    font-size: 18px;
  }
  /* macOS は閉じるボタンだけを左上へ (⚙ は右のまま)。
     Windows/Linux は DOM 順のまま close が右端になる (order を触らない) */
  &[data-mac='true'] .close {
    order: -1;
  }
`
const DragZone = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-size: 11px;
  cursor: grab;
  user-select: none;
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
