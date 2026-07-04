import { Icon, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { CSSProperties, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import styled from 'styled-components'
import { BroadcastItem } from '../../types'
import { tokens } from '../../utils/tokens'
import { useSlots } from '../hooks/useSlots'
import { gadgetMap } from '../gadgets'

type Props = {
  item: BroadcastItem
  editMode: boolean
  /** 親キャンバスの表示スケール (react-rnd のドラッグ座標補正用) */
  scale: number
  selected: boolean
  onSelect: () => void
  onChange: (patch: Partial<BroadcastItem>) => void
  onRemove: () => void
}

function BroadcastFrame({
  item,
  editMode,
  scale,
  selected,
  onSelect,
  onChange,
  onRemove,
}: Props) {
  const gadget = gadgetMap[item.gadgetKey]
  const Component = gadget?.Component
  const spec = gadget?.config
  const slots = useSlots(
    item.gadgetKey,
    spec?.defaultConfig ?? {},
    gadget?.configId
  )
  const slotId = item.slotId ?? slots.firstId
  const config = slots.getSlot(slotId).config
  const setConfig = (updater: unknown) =>
    slots.setSlotConfig(
      slotId,
      updater as Parameters<typeof slots.setSlotConfig>[1]
    )
  const ratio = spec?.getAspectRatio?.(config)
  const lockAspectRatio =
    typeof ratio === 'number' ? ratio : Boolean(item.lockAspect)
  const handleStyles = editMode ? buildHandleStyles(selected) : undefined

  // 編集画面でのみ、Frame など固定アス比 gadget の枠サイズを比率にスナップする
  useEffect(() => {
    if (!editMode || typeof ratio !== 'number') return
    const expectedH = Math.round(item.width / ratio)

    if (Math.abs(expectedH - item.height) > 1) onChange({ height: expectedH })
    // ratio が変わったときだけ補正する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratio, editMode])

  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      scale={scale}
      bounds="parent"
      disableDragging={!editMode}
      enableResizing={editMode}
      lockAspectRatio={lockAspectRatio}
      resizeHandleStyles={handleStyles}
      dragHandleClassName="bc-drag"
      onDragStop={(_e, d) => onChange({ x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, position) =>
        onChange({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        })
      }
      onMouseDown={onSelect}
    >
      <Style
        data-edit={editMode}
        data-selected={selected}
        // @ts-ignore CSS custom property: SizeDef 系 gadget の文字基準を倍率調整
        style={{ '--font-scale': item.fontScale ?? 1 }}
      >
        {editMode && (
          <div className="bc-drag header">
            <span className="title">
              <Icon fontSize="small">{gadget?.icon ?? 'widgets'}</Icon>
              {gadget?.title ?? item.gadgetKey}
            </span>
            <IconButton size="small" onClick={onRemove}>
              <Close fontSize="small" />
            </IconButton>
          </div>
        )}
        <div className="body" style={{ opacity: item.opacity ?? 1 }}>
          {spec ? (
            <spec.Atom config={config} setConfig={setConfig} />
          ) : Component ? (
            <Component />
          ) : null}
        </div>
      </Style>
    </Rnd>
  )
}

/** リサイズつまみを掴みやすく大きくする。選択中は見えるドットにする。 */
const buildHandleStyles = (selected: boolean) => {
  const size = 16
  const corner: CSSProperties = {
    width: size,
    height: size,
    ...(selected
      ? {
          background: tokens.color.primaryRing,
          border: '1px solid #fff',
          borderRadius: 3,
        }
      : {}),
  }

  return {
    topLeft: corner,
    topRight: corner,
    bottomLeft: corner,
    bottomRight: corner,
    top: { height: size },
    bottom: { height: size },
    left: { width: size },
    right: { width: size },
  }
}

const Style = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${tokens.radius.sm};

  &[data-edit='true'] {
    box-shadow: 0 0 0 1px ${tokens.color.border};
  }
  &[data-edit='true']:hover {
    box-shadow: 0 0 0 1px ${tokens.color.primaryRing};
  }
  &[data-selected='true'] {
    box-shadow: 0 0 0 2px ${tokens.color.primaryRing};
  }

  /* ヘッダーは編集時のみ body の上にオーバーレイ (body は常に枠フルサイズ=表示と一致)。
     普段は隠してガジェット自身の操作を邪魔せず、hover/選択時だけ出す。 */
  /* 単体ガジェット窓 (GadgetWindow) のバーと見た目を揃える。
     ダーク半透明 + 白アイコンで、どのガジェット背景でも視認できる。 */
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    padding: 0 ${tokens.space.xs};
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    cursor: move;
    user-select: none;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s;
  }
  .header .MuiIconButton-root {
    color: #fff;
    padding: 2px;
  }
  &[data-edit='true']:hover .header,
  &[data-selected='true'] .header {
    opacity: 1;
    pointer-events: auto;
  }
  .title {
    display: flex;
    align-items: center;
    gap: ${tokens.space.xs};
    font-size: 12px;
  }
  .body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`

export default BroadcastFrame
