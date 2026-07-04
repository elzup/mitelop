import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useParams } from '@tanstack/react-router'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import { isTauri } from '../utils/platform'
import { tokens } from '../utils/tokens'
import { useLocalStorage } from '../utils/useLocalStorage'
import { useTransparentBody } from './Broadcast/useTauriOverlay'
import { gadgetMap } from './gadgets'
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
 * OS のヘッダーは無し。上部の細いバー (ホバーで濃くなる) がドラッグ + 閉じる。
 * 設定は中の Tool 自身の ⚙ (OpenConfigButton) に任せる (二重表示を避ける)。
 */
function GadgetWindow() {
  const { gadgetKey } = useParams({ strict: false })
  const def = gadgetKey ? gadgetMap[gadgetKey] : undefined
  // 全ガジェット共通の透過度 (設定窓のスライダーと同じキー)
  const [opacity] = useLocalStorage<number>(`config-opacity-${gadgetKey}`, 1)

  useTransparentBody(true)

  if (!def) return <Unknown>unknown gadget: {String(gadgetKey)}</Unknown>

  const Component = def.Component

  return (
    <Root>
      <Bar>
        <DragZone data-tauri-drag-region>{def.title}</DragZone>
        <Actions>
          <IconButton size="small" onClick={() => void closeSelf()}>
            <Close fontSize="small" />
          </IconButton>
        </Actions>
      </Bar>
      <Body style={{ opacity } as CSSProperties}>
        <Component windowMode={def.windowMode} />
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
  height: 22px;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.12s;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;

  ${Root}:hover & {
    opacity: 1;
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
const Actions = styled.div`
  display: flex;
  align-items: center;
  .MuiIconButton-root {
    color: #fff;
    padding: 2px;
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
