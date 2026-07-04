import { Fab } from '@material-ui/core'
import { Tune } from '@material-ui/icons'
import { useSearch } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { tokens } from '../../utils/tokens'
import BroadcastFrame from './BroadcastFrame'
import { ratioDims, useBroadcast } from './useBroadcast'
import { useGadgetWindow } from './useGadgetWindow'
import { useTauriOverlay } from './useTauriOverlay'

const useBoardId = () => {
  const search = useSearch({ strict: false })

  return 'board' in search && typeof search.board === 'string'
    ? search.board
    : 'main'
}

/** stage の実サイズに設計座標系 (dw×dh) を contain させるスケール係数を測る */
function useStageScale(dw: number, dh: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current

    if (!el) return
    const update = () => {
      const { width, height } = el.getBoundingClientRect()

      setScale(Math.min(width / dw, height / dh) || 1)
    }

    update()
    const observer = new ResizeObserver(update)

    observer.observe(el)

    return () => observer.disconnect()
  }, [dw, dh])

  return { ref, scale }
}

/**
 * 配信表示ウィンドウ (/broadcast)。stage だけを描く OBS キャプチャ対象。
 * 編集は別窓 (/broadcast/control) が担い、その編集トグルは `broadcast-editing` を
 * 通じてこの stage に同期する。editing=false のときは完全にクリーン。
 */
function BroadcastTool() {
  const boardId = useBoardId()
  const {
    config,
    selectedId,
    setSelectedId,
    editing,
    frame,
    updateItem,
    removeItem,
  } = useBroadcast(boardId)

  useTauriOverlay()
  const dims = ratioDims(frame.ratio)
  const { ref: stageRef, scale: fitScale } = useStageScale(dims.w, dims.h)
  // ロック時は枠サイズを等倍固定 (ウィンドウリサイズで変わらない)、非ロックは contain フィット
  const scale = frame.locked ? 1 : fitScale
  const { openControlWindow } = useGadgetWindow()

  return (
    <Style>
      <Stage ref={stageRef}>
        <Design
          style={{
            width: dims.w,
            height: dims.h,
            transform: `scale(${scale})`,
            background: frame.bg ?? '#ffffff',
          }}
        >
          <Canvas
            data-edit={editing}
            onMouseDown={(e) => {
              // 枠ではなく空のキャンバスを押したときだけ選択解除 (バブリング対策)
              if (e.target === e.currentTarget) setSelectedId(null)
            }}
          >
            {config.items.map((item) => (
              <BroadcastFrame
                key={item.id}
                item={item}
                editMode={editing}
                scale={scale}
                selected={selectedId === item.id}
                onSelect={() => setSelectedId(item.id)}
                onChange={(patch) => updateItem(item.id, patch)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </Canvas>
        </Design>
      </Stage>

      {/* 配信中はカーソルのない OBS で隠れたまま。ホバーでだけ出るコントロール窓ボタン */}
      <ControlFab
        size="small"
        color="primary"
        onClick={() => openControlWindow(boardId)}
        title="コントロール窓を開く"
      >
        <Tune />
      </ControlFab>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
/** 設計座標系を画面に収めるための器。配信枠は左上アンカー (キャプチャ位置を固定)。 */
const Stage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`
/** 比率プリセットで決まる設計面。左上基点で contain スケールされる。
    outline が配信枠 (broadcast border)。scale で薄くなるので太めに引く。 */
const Design = styled.div`
  position: relative;
  flex: none;
  transform-origin: top left;
  outline: 3px solid ${tokens.color.primaryRing};
  outline-offset: -1px;
`
const Canvas = styled.div`
  position: absolute;
  inset: 0;
  &[data-edit='true'] {
    background: ${tokens.color.overlayScrim};
    box-shadow: 0 0 0 1px ${tokens.color.border};
  }
`
const ControlFab = styled(Fab)`
  position: absolute;
  bottom: ${tokens.space.md};
  right: ${tokens.space.md};
  z-index: 20;
  opacity: 0;
  transition: opacity 0.15s;
  &:hover,
  &:focus {
    opacity: 1;
  }
`

export default BroadcastTool
