import {
  Divider,
  Icon,
  IconButton,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { Close, Settings } from '@material-ui/icons'
import styled from 'styled-components'
import { BroadcastConfig } from '../../types'
import { denseTheme } from '../../utils/theme'
import { tokens } from '../../utils/tokens'
import { gadgetMap, gadgets } from '../gadgets'

type Props = {
  config: BroadcastConfig
  selectedId: string | null
  onAddGadget: (gadgetKey: string) => void
  onRemoveItem: (id: string) => void
  onSelectItem: (id: string) => void
  /** 配置インスタンスの設定を別窓で開く */
  onOpenConfig: (gadgetKey: string, instanceId: string) => void
  isConfigOpen?: (gadgetKey: string, instanceId: string) => boolean
}

function BroadcastPanel({
  config,
  selectedId,
  onAddGadget,
  onRemoveItem,
  onSelectItem,
  onOpenConfig,
  isConfigOpen,
}: Props) {
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
          {config.items.length === 0 && (
            <Typography variant="caption" color="textSecondary">
              上のアイコンから追加してください
            </Typography>
          )}
          {config.items.map((item) => {
            const g = gadgetMap[item.gadgetKey]
            const open = isConfigOpen?.(item.gadgetKey, item.id)

            return (
              <div
                key={item.id}
                className="item-row"
                data-selected={selectedId === item.id}
                onClick={() => onSelectItem(item.id)}
              >
                <Icon fontSize="small">{g?.icon ?? 'widgets'}</Icon>
                <span className="item-title">{g?.title ?? item.gadgetKey}</span>
                <Tooltip title="設定を別窓で開く">
                  <IconButton
                    color={open ? 'primary' : 'default'}
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenConfig(item.gadgetKey, item.id)
                    }}
                  >
                    <Settings fontSize="small" />
                  </IconButton>
                </Tooltip>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveItem(item.id)
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </div>
            )
          })}
        </Section>
      </Style>
    </ThemeProvider>
  )
}

/** レイアウト (位置・幅・スクロール) は親 (コントロール窓) が決める */
const Style = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${tokens.color.surface};
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
