import {
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Switch,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { Add, Delete, Edit, FileCopy } from '@material-ui/icons'
import { useParams, useSearch } from '@tanstack/react-router'
import styled from 'styled-components'
import { BroadcastItem } from '../../types'
import { denseTheme } from '../../utils/theme'
import { tokens } from '../../utils/tokens'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { GadgetDef, gadgetMap } from '../gadgets'
import { useSlots } from '../hooks/useSlots'
import { LayoutPicker } from '../LayoutPicker'
import { useBroadcast } from './useBroadcast'

type Slots = ReturnType<typeof useSlots>

/** スロット (プリセット) の選択 + 新規/複製/名前変更/削除 */
function SlotBar({
  slots,
  currentId,
  onSelect,
  title,
}: {
  slots: Slots
  currentId: string
  onSelect: (id: string) => void
  title: string
}) {
  const current = slots.getSlot(currentId)

  return (
    <Bar>
      <Select
        value={currentId}
        onChange={(e) => onSelect(String(e.target.value))}
        className="select"
      >
        {slots.order.map((id) => (
          <MenuItem key={id} value={id}>
            {slots.slots[id]?.name ?? id}
          </MenuItem>
        ))}
      </Select>
      <Tooltip title="新規スロット">
        <IconButton
          size="small"
          onClick={() =>
            onSelect(
              slots.addSlot(undefined, `${title} ${slots.order.length + 1}`)
            )
          }
        >
          <Add fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="複製">
        <IconButton
          size="small"
          onClick={() =>
            onSelect(slots.addSlot(current.config, `${current.name} 複製`))
          }
        >
          <FileCopy fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="名前変更">
        <IconButton
          size="small"
          onClick={() => {
            const name = window.prompt('スロット名', current.name)

            if (name) slots.renameSlot(currentId, name)
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="削除">
        <span>
          <IconButton
            size="small"
            disabled={slots.order.length <= 1}
            onClick={() => {
              slots.removeSlot(currentId)
              onSelect(slots.firstId)
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Bar>
  )
}

/** 配置インスタンス共通のサイズ挙動 (gadget 固有設定ではない) */
function ItemControls({
  item,
  onUpdate,
}: {
  item: BroadcastItem
  onUpdate: (patch: Partial<BroadcastItem>) => void
}) {
  return (
    <div className="item-controls">
      <FormControlLabel
        control={
          <Switch
            checked={Boolean(item.lockAspect)}
            onChange={(e) => onUpdate({ lockAspect: e.target.checked })}
          />
        }
        label="アス比を固定してリサイズ"
      />
      <Typography variant="caption" color="textSecondary">
        文字スケール ×{(item.fontScale ?? 1).toFixed(1)}
      </Typography>
      <Slider
        min={0.3}
        max={3}
        step={0.1}
        value={item.fontScale ?? 1}
        onChange={(_e, v) =>
          onUpdate({ fontScale: Array.isArray(v) ? v[0] : v })
        }
      />
    </div>
  )
}

function ConfigWindowInner({
  def,
  instanceId,
}: {
  def: GadgetDef
  instanceId?: string
}) {
  const spec = def.config
  const slots = useSlots(def.key, spec?.defaultConfig ?? {}, def.configId)
  const { config: broadcast, updateItem } = useBroadcast()
  const item = instanceId
    ? broadcast.items.find((it) => it.id === instanceId)
    : undefined
  // standalone (instanceId なし) はページ横断で使うスロットを別キーに保持する
  const [activeStandalone, setActiveStandalone] = useLocalStorage<
    string | null
  >(`config-active-${def.key}`, null)
  // 全ガジェット共通の透過度。配置インスタンスは item、単独窓は gadget キーで保持
  const [standaloneOpacity, setStandaloneOpacity] = useLocalStorage<number>(
    `config-opacity-${def.key}`,
    1
  )
  const opacity = item ? item.opacity ?? 1 : standaloneOpacity
  const setOpacity = (v: number) =>
    item ? updateItem(item.id, { opacity: v }) : setStandaloneOpacity(v)

  const referenced = instanceId
    ? item?.slotId ?? slots.firstId
    : activeStandalone ?? slots.firstId
  // 参照先スロットが削除済みなら先頭にフォールバック (Select の不正値を防ぐ)
  const currentId = slots.slots[referenced] ? referenced : slots.firstId
  const selectSlot = (id: string) =>
    instanceId && item
      ? updateItem(item.id, { slotId: id })
      : setActiveStandalone(id)

  const slot = slots.getSlot(currentId)
  const Editor = spec?.ConfigEditor

  return (
    <ThemeProvider theme={denseTheme}>
      <Body>
        <Typography variant="subtitle2">{def.title} 設定</Typography>
        {spec && (
          <SlotBar
            slots={slots}
            currentId={currentId}
            onSelect={selectSlot}
            title={def.title}
          />
        )}
        {item && (
          <ItemControls
            item={item}
            onUpdate={(patch) => updateItem(item.id, patch)}
          />
        )}
        <div className="opacity">
          <Typography variant="caption" color="textSecondary">
            透過度 {Math.round(opacity * 100)}%
          </Typography>
          <Slider
            min={0.1}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(_e, v) => setOpacity(Array.isArray(v) ? v[0] : v)}
          />
        </div>
        {spec?.layouts && spec.layouts.length > 0 && (
          <LayoutPicker
            layouts={spec.layouts}
            value={
              (slot.config as { layout?: string }).layout ?? spec.layouts[0].id
            }
            currentAspect={item ? item.width / item.height : undefined}
            onSelect={(id) =>
              slots.setSlotConfig(currentId, { ...slot.config, layout: id })
            }
          />
        )}
        {Editor ? (
          <Editor
            config={slot.config}
            setConfig={(u) => slots.setSlotConfig(currentId, u)}
          />
        ) : (
          <Typography variant="caption" color="textSecondary">
            このガジェットに固有の設定はありません。
          </Typography>
        )}
      </Body>
    </ThemeProvider>
  )
}

/**
 * /config/$gadgetKey?instanceId= で開くガジェット設定窓。
 * ガジェット種別の設定スロット (config-slots-<key>) を編集し、instanceId ありなら
 * その配置が参照するスロットを、なしなら standalone のアクティブスロットを切り替える。
 * localStorage 同期で stage / 標準ページに即反映される。
 */
function ConfigWindow() {
  const params = useParams({ strict: false })
  const search = useSearch({ strict: false })
  const gadgetKey = params.gadgetKey
  const instanceId =
    'instanceId' in search && typeof search.instanceId === 'string'
      ? search.instanceId
      : undefined
  const def = gadgetKey ? gadgetMap[gadgetKey] : undefined

  if (!def) {
    return (
      <Body>
        <Typography color="error">ガジェットが見つかりません</Typography>
      </Body>
    )
  }

  return <ConfigWindowInner def={def} instanceId={instanceId} />
}

const Body = styled.div`
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${tokens.color.surface};
  min-height: 100%;

  .item-controls {
    display: flex;
    flex-direction: column;
    padding-bottom: 4px;
    border-bottom: dashed 1px ${tokens.color.border};
  }
`
const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding-bottom: 4px;
  border-bottom: dashed 1px ${tokens.color.border};

  .select {
    flex-grow: 1;
    font-size: 13px;
  }
`

export default ConfigWindow
