import { Fab } from '@material-ui/core'
import { Edit, OpenInNew } from '@material-ui/icons'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BroadcastConfig, BroadcastItem } from '../../types'
import { tokens } from '../../utils/tokens'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { gadgetDefaultSize } from '../gadgets'
import BroadcastFrame from './BroadcastFrame'
import BroadcastPanel from './BroadcastPanel'

type Props = { mode?: 'display' | 'edit' }

/** 配信の基準解像度。編集/表示の両モードでこの座標系を共有し、WYSIWYG を担保する。 */
const DESIGN_WIDTH = 1280
const DESIGN_HEIGHT = 720

const initialConfig: BroadcastConfig = {
  items: [],
}

/** stage の実サイズに収まるよう設計座標系を等倍スケールする係数を測る */
function useStageScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current

    if (!el) return
    const update = () => {
      const { width, height } = el.getBoundingClientRect()

      setScale(Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT) || 1)
    }

    update()
    const observer = new ResizeObserver(update)

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return { ref, scale }
}

const genId = () =>
  `bc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

const openEditor = () =>
  window.open(
    '/broadcast/edit',
    'mitelop-bc-edit',
    'popup,width=1180,height=760'
  )
const openOverlay = () =>
  window.open('/broadcast', 'mitelop-bc-overlay', 'width=1280,height=720')

function BroadcastTool({ mode = 'display' }: Props) {
  const editMode = mode === 'edit'
  const [config, setConfig] = useLocalStorage<BroadcastConfig>(
    'broadcast',
    initialConfig
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { ref: stageRef, scale } = useStageScale()

  const addGadget = (gadgetKey: string) => {
    const item: BroadcastItem = {
      id: genId(),
      gadgetKey,
      x: 40,
      y: 40,
      ...gadgetDefaultSize(gadgetKey),
    }

    setConfig((v) => ({ ...v, items: [...v.items, item] }))
    setSelectedId(item.id)
  }

  const updateItem = (id: string, patch: Partial<BroadcastItem>) =>
    setConfig((v) => ({
      ...v,
      items: v.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }))

  const removeItem = (id: string) =>
    setConfig((v) => ({ ...v, items: v.items.filter((it) => it.id !== id) }))

  return (
    <Style>
      <Stage ref={stageRef} data-edit={editMode}>
        <Design
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <Canvas
            data-edit={editMode}
            onMouseDown={(e) => {
              // 枠ではなく空のキャンバスを押したときだけ選択解除 (バブリング対策)
              if (e.target === e.currentTarget) setSelectedId(null)
            }}
          >
            {config.items.map((item) => (
              <BroadcastFrame
                key={item.id}
                item={item}
                editMode={editMode}
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

      {editMode ? (
        <>
          <BroadcastPanel
            config={config}
            selectedId={selectedId}
            onAddGadget={addGadget}
            onRemoveItem={removeItem}
            onSelectItem={setSelectedId}
            onUpdateItem={updateItem}
          />
          <OverlayFab
            size="small"
            color="primary"
            onClick={openOverlay}
            title="表示ウィンドウを開く"
          >
            <OpenInNew />
          </OverlayFab>
        </>
      ) : (
        <EditFab
          size="small"
          color="primary"
          onClick={openEditor}
          title="編集ウィンドウを開く"
        >
          <Edit />
        </EditFab>
      )}
    </Style>
  )
}

const PANEL_WIDTH = 320

const Style = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
/** 設計座標系を画面に収めるための器。編集時はパネル幅ぶん右を空ける。 */
const Stage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &[data-edit='true'] {
    right: ${PANEL_WIDTH}px;
  }
`
/** 1280x720 の固定サイズ面。中心基点で等倍スケールされる。 */
const Design = styled.div`
  position: relative;
  flex: none;
  transform-origin: center center;
`
const Canvas = styled.div`
  position: absolute;
  inset: 0;
  &[data-edit='true'] {
    background: ${tokens.color.overlayScrim};
    box-shadow: 0 0 0 1px ${tokens.color.border};
  }
`
const OverlayFab = styled(Fab)`
  position: absolute;
  bottom: ${tokens.space.md};
  z-index: 20;
  right: ${PANEL_WIDTH + 16}px;
`
/** 表示(配信)モードの編集ボタン。カーソルが無い OBS では隠れたまま。 */
const EditFab = styled(Fab)`
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
