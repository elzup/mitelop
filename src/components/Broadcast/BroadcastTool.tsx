import { Fab } from '@material-ui/core'
import { Edit, Visibility } from '@material-ui/icons'
import { useState } from 'react'
import styled from 'styled-components'
import { BroadcastConfig, BroadcastItem } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import BroadcastBand from './BroadcastBand'
import BroadcastFrame from './BroadcastFrame'
import BroadcastPanel from './BroadcastPanel'

const initialConfig: BroadcastConfig = {
  items: [],
  band: {
    visible: true,
    activeIndex: 0,
    phrases: [''],
    bgColor: '#2b0065',
    fontColor: '#ffffff',
  },
}

const genId = () =>
  `bc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

function BroadcastTool() {
  const [config, setConfig] = useLocalStorage<BroadcastConfig>(
    'broadcast',
    initialConfig
  )
  const [editMode, setEditMode] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const addGadget = (gadgetKey: string) => {
    const item: BroadcastItem = {
      id: genId(),
      gadgetKey,
      x: 40,
      y: 40,
      width: 320,
      height: 240,
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

  const updateBand = (patch: Partial<BroadcastConfig['band']>) =>
    setConfig((v) => ({ ...v, band: { ...v.band, ...patch } }))

  return (
    <Style>
      <Canvas onMouseDown={() => setSelectedId(null)}>
        {config.items.map((item) => (
          <BroadcastFrame
            key={item.id}
            item={item}
            editMode={editMode}
            selected={selectedId === item.id}
            onSelect={() => setSelectedId(item.id)}
            onChange={(patch) => updateItem(item.id, patch)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
        <BroadcastBand band={config.band} />
      </Canvas>

      {editMode && (
        <BroadcastPanel
          config={config}
          selectedId={selectedId}
          onAddGadget={addGadget}
          onRemoveItem={removeItem}
          onSelectItem={setSelectedId}
          onUpdateBand={updateBand}
        />
      )}

      <ToggleFab
        size="small"
        color="primary"
        onClick={() => setEditMode((v) => !v)}
        title={editMode ? '配信モード (UIを隠す)' : '編集モード'}
        data-edit={editMode}
      >
        {editMode ? <Visibility /> : <Edit />}
      </ToggleFab>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Canvas = styled.div`
  position: absolute;
  inset: 0;
`
const ToggleFab = styled(Fab)`
  position: absolute;
  bottom: 16px;
  z-index: 20;
  right: 16px;
  &[data-edit='true'] {
    right: 336px;
  }
`

export default BroadcastTool
