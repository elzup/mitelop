import {
  Button,
  Divider,
  Icon,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import { Add, Close, PlayArrow } from '@material-ui/icons'
import { useState } from 'react'
import styled from 'styled-components'
import { BroadcastConfig, BroadcastItem } from '../../types'
import { tokens } from '../../utils/tokens'
import ColorField from '../forms/ColorField'
import { gadgetMap, gadgets } from '../gadgets'

type Props = {
  config: BroadcastConfig
  onAddGadget: (gadgetKey: string) => void
  onRemoveItem: (id: string) => void
  onSelectItem: (id: string) => void
  selectedId: string | null
  onUpdateBand: (patch: Partial<BroadcastConfig['band']>) => void
}

function BroadcastPanel({
  config,
  onAddGadget,
  onRemoveItem,
  onSelectItem,
  selectedId,
  onUpdateBand,
}: Props) {
  const [pickKey, setPickKey] = useState(gadgets[0].key)
  const { band } = config

  const setPhrase = (index: number, value: string) => {
    const phrases = config.band.phrases.map((p, i) => (i === index ? value : p))

    onUpdateBand({ phrases })
  }
  const addPhrase = () =>
    onUpdateBand({ phrases: [...config.band.phrases, ''] })
  const removePhrase = (index: number) => {
    const phrases = config.band.phrases.filter((_, i) => i !== index)
    const activeIndex = Math.min(band.activeIndex, phrases.length - 1)

    onUpdateBand({ phrases, activeIndex: Math.max(0, activeIndex) })
  }

  return (
    <Style>
      <Section>
        <Typography variant="subtitle2">ガジェット追加</Typography>
        <div className="add-row">
          <Select
            value={pickKey}
            onChange={(e) => setPickKey(String(e.target.value))}
            margin="dense"
          >
            {gadgets.map((g) => (
              <MenuItem key={g.key} value={g.key}>
                {g.title}
              </MenuItem>
            ))}
          </Select>
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => onAddGadget(pickKey)}
          >
            追加
          </Button>
        </div>
      </Section>

      <Divider />

      <Section>
        <Typography variant="subtitle2">
          配置済み ({config.items.length})
        </Typography>
        {config.items.map((item: BroadcastItem) => {
          const g = gadgetMap[item.gadgetKey]

          return (
            <div
              key={item.id}
              className="item-row"
              data-selected={selectedId === item.id}
              onClick={() => onSelectItem(item.id)}
            >
              <Icon fontSize="small">{g?.icon ?? 'widgets'}</Icon>
              <span className="item-title">{g?.title ?? item.gadgetKey}</span>
              <IconButton size="small" onClick={() => onRemoveItem(item.id)}>
                <Close fontSize="small" />
              </IconButton>
            </div>
          )
        })}
      </Section>

      <Divider />

      <Section>
        <div className="band-head">
          <Typography variant="subtitle2">下の帯 (テロップ)</Typography>
          <Switch
            size="small"
            checked={band.visible}
            onChange={(e) => onUpdateBand({ visible: e.target.checked })}
          />
        </div>
        <div className="band-colors">
          <ColorField
            label="背景"
            value={band.bgColor}
            onChange={(bgColor) => onUpdateBand({ bgColor })}
          />
          <ColorField
            label="文字"
            value={band.fontColor}
            onChange={(fontColor) => onUpdateBand({ fontColor })}
          />
        </div>
        {band.phrases.map((phrase, i) => (
          <div
            key={i}
            className="phrase-row"
            data-active={band.activeIndex === i}
          >
            <IconButton
              size="small"
              color={band.activeIndex === i ? 'primary' : 'default'}
              onClick={() => onUpdateBand({ activeIndex: i })}
              title="この言葉を表示"
            >
              <PlayArrow fontSize="small" />
            </IconButton>
            <TextField
              fullWidth
              margin="dense"
              placeholder="表示する言葉"
              value={phrase}
              onChange={(e) => setPhrase(i, e.target.value)}
            />
            <IconButton size="small" onClick={() => removePhrase(i)}>
              <Close fontSize="small" />
            </IconButton>
          </div>
        ))}
        <Button size="small" startIcon={<Add />} onClick={addPhrase}>
          言葉を追加
        </Button>
      </Section>
    </Style>
  )
}

const Style = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: ${tokens.color.surface};
  border-left: solid 1px ${tokens.color.border};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  z-index: 10;
`
const Section = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .add-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .item-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 4px;
    border-radius: 4px;
    cursor: pointer;
  }
  .item-row[data-selected='true'] {
    background: ${tokens.color.primaryWeak};
  }
  .item-title {
    flex-grow: 1;
    font-size: 14px;
  }
  .band-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .band-colors {
    display: flex;
    gap: 8px;
  }
  .phrase-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .phrase-row[data-active='true'] {
    background: ${tokens.color.primaryWeak};
    border-radius: ${tokens.radius.sm};
  }
`

export default BroadcastPanel
