import {
  Divider,
  FormControlLabel,
  Icon,
  IconButton,
  Slider,
  Switch,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import styled from 'styled-components'
import { BroadcastConfig, BroadcastItem } from '../../types'
import { denseTheme } from '../../utils/theme'
import { tokens } from '../../utils/tokens'
import { GadgetDef, gadgetMap, gadgets } from '../gadgets'
import { useConfig } from '../hooks/useConfig'

type Props = {
  config: BroadcastConfig
  onAddGadget: (gadgetKey: string) => void
  onRemoveItem: (id: string) => void
  onSelectItem: (id: string) => void
  onUpdateItem: (id: string, patch: Partial<BroadcastItem>) => void
  selectedId: string | null
}

/** 選択中インスタンスの設定 UI を per-instance config に束ねて描画する */
function ConfiguredEditor({
  gadget,
  instanceId,
}: {
  gadget: GadgetDef
  instanceId: string
}) {
  const spec = gadget.config
  const { config, setConfig } = useConfig(
    gadget.key,
    spec?.defaultConfig ?? {},
    instanceId
  )

  if (!spec) return null
  const Editor = spec.ConfigEditor

  return <Editor config={config} setConfig={setConfig} />
}

function BroadcastPanel({
  config,
  onAddGadget,
  onRemoveItem,
  onSelectItem,
  onUpdateItem,
  selectedId,
}: Props) {
  const selected = config.items.find((it) => it.id === selectedId)
  const selectedGadget = selected ? gadgetMap[selected.gadgetKey] : undefined

  return (
    <ThemeProvider theme={denseTheme}>
      <Style>
        <Section>
          <Typography variant="subtitle2">ガジェット追加</Typography>
          <div className="add-grid">
            {gadgets.map((g) => (
              <Tooltip key={g.key} title={g.title}>
                <IconButton onClick={() => onAddGadget(g.key)}>
                  <Icon>{g.icon}</Icon>
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </Section>

        <Divider />

        <Section>
          <Typography variant="subtitle2">
            配置済み ({config.items.length})
          </Typography>
          {config.items.map((item) => {
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
                <IconButton onClick={() => onRemoveItem(item.id)}>
                  <Close fontSize="small" />
                </IconButton>
              </div>
            )
          })}
        </Section>

        <Divider />

        <Section>
          <Typography variant="subtitle2">
            設定{selectedGadget ? ` — ${selectedGadget.title}` : ''}
          </Typography>
          {!selected && (
            <Typography variant="caption" color="textSecondary">
              枠を選択すると設定が表示されます
            </Typography>
          )}
          {selected && (
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(selected.lockAspect)}
                  onChange={(e) =>
                    onUpdateItem(selected.id, { lockAspect: e.target.checked })
                  }
                />
              }
              label="アス比を固定してリサイズ"
            />
          )}
          {selected && selectedGadget?.config && (
            <ConfiguredEditor
              key={selected.id}
              gadget={selectedGadget}
              instanceId={selected.id}
            />
          )}
          {selected && !selectedGadget?.config && (
            <div className="font-scale">
              <Typography variant="caption" color="textSecondary">
                文字スケール ×{(selected.fontScale ?? 1).toFixed(1)}
              </Typography>
              <Slider
                min={0.3}
                max={3}
                step={0.1}
                value={selected.fontScale ?? 1}
                onChange={(_e, v) =>
                  onUpdateItem(selected.id, {
                    fontScale: Array.isArray(v) ? v[0] : v,
                  })
                }
              />
            </div>
          )}
        </Section>
      </Style>
    </ThemeProvider>
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
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .add-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2px;
  }
  .item-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 2px 4px;
    border-radius: ${tokens.radius.sm};
    cursor: pointer;
  }
  .item-row[data-selected='true'] {
    background: ${tokens.color.primaryWeak};
  }
  .item-title {
    flex-grow: 1;
    font-size: 13px;
  }
`

export default BroadcastPanel
