import { MouseEvent } from 'react'
import styled from 'styled-components'
import { isTauri } from '../utils/platform'

/** 枠なし窓には OS のリサイズ枠が無いので、右下のつまみから自前でリサイズを開始する */
async function startResize(e: MouseEvent) {
  if (!isTauri()) return
  e.preventDefault()
  const { getCurrentWindow } = await import('@tauri-apps/api/window')

  await getCurrentWindow().startResizeDragging('SouthEast')
}

/** 枠なし透過窓の右下に出すリサイズつまみ (web / 非 Tauri では何も出さない) */
export function ResizeGrip() {
  if (!isTauri()) return null

  return <Grip onMouseDown={(e) => void startResize(e)} />
}

const Grip = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  z-index: 50;
  cursor: nwse-resize;
  background: linear-gradient(
    135deg,
    transparent 45%,
    rgba(0, 0, 0, 0.35) 45%,
    rgba(0, 0, 0, 0.35) 55%,
    transparent 55%,
    transparent 70%,
    rgba(0, 0, 0, 0.35) 70%
  );
`
