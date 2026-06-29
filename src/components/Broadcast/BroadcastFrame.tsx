import { Icon, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Rnd } from 'react-rnd'
import styled from 'styled-components'
import { BroadcastItem } from '../../types'
import { tokens } from '../../utils/tokens'
import { gadgetMap } from '../gadgets'

type Props = {
  item: BroadcastItem
  editMode: boolean
  selected: boolean
  onSelect: () => void
  onChange: (patch: Partial<BroadcastItem>) => void
  onRemove: () => void
}

function BroadcastFrame({
  item,
  editMode,
  selected,
  onSelect,
  onChange,
  onRemove,
}: Props) {
  const gadget = gadgetMap[item.gadgetKey]
  const Component = gadget?.Component

  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      bounds="parent"
      disableDragging={!editMode}
      enableResizing={editMode}
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
      <Style data-edit={editMode} data-selected={selected}>
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
        <div className="body">{Component ? <Component /> : null}</div>
      </Style>
    </Rnd>
  )
}

const Style = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
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

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    padding: 0 ${tokens.space.xs};
    background: ${tokens.color.surface};
    border-bottom: 1px solid ${tokens.color.border};
    color: ${tokens.color.textWeak};
    cursor: move;
    user-select: none;
  }
  .title {
    display: flex;
    align-items: center;
    gap: ${tokens.space.xs};
    font-size: 12px;
  }
  .body {
    overflow: hidden;
  }
`

export default BroadcastFrame
