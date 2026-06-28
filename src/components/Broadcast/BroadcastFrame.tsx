import { Icon, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Rnd } from 'react-rnd'
import styled from 'styled-components'
import { BroadcastItem } from '../../types'
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
        <div className="body">{gadget?.render() ?? null}</div>
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

  &[data-edit='true'] {
    outline: 1px dashed rgba(43, 0, 101, 0.4);
  }
  &[data-selected='true'] {
    outline: 2px solid #2b0065;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    background: rgba(43, 0, 101, 0.85);
    color: white;
    cursor: move;
    user-select: none;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
  }
  .body {
    overflow: hidden;
  }
`

export default BroadcastFrame
