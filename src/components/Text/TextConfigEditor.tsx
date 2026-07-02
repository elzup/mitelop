import {
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import { Add, Close, PlayArrow } from '@material-ui/icons'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import {
  TextAlign,
  TextGadgetConfig,
  TextScroll,
  TextVAlign,
} from '../../types'
import ColorField from '../forms/ColorField'
import { activePreset, genPresetId } from './textConfig'

type Props = {
  config: TextGadgetConfig
  setConfig: Dispatch<SetStateAction<TextGadgetConfig>>
}

const resizeCells = (cells: string[], count: number): string[] =>
  Array.from({ length: count }, (_, i) => cells[i] ?? '')

const GRID_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8]

function TextConfigEditor({ config, setConfig }: Props) {
  const patch = (p: Partial<TextGadgetConfig>) =>
    setConfig((v) => ({ ...v, ...p }))

  const setGrid = (key: 'rows' | 'cols', next: number) => {
    setConfig((v) => {
      const rows = key === 'rows' ? next : v.rows
      const cols = key === 'cols' ? next : v.cols
      const count = rows * cols

      return {
        ...v,
        rows,
        cols,
        presets: v.presets.map((p) => ({
          ...p,
          cells: resizeCells(p.cells, count),
        })),
      }
    })
  }

  const addPreset = () =>
    setConfig((v) => {
      const id = genPresetId()

      return {
        ...v,
        activeId: id,
        presets: [
          ...v.presets,
          {
            id,
            label: `プリセット${v.presets.length + 1}`,
            cells: resizeCells([], v.rows * v.cols),
          },
        ],
      }
    })

  const removePreset = (id: string) =>
    setConfig((v) => {
      if (v.presets.length <= 1) return v
      const presets = v.presets.filter((p) => p.id !== id)
      const activeId = v.activeId === id ? presets[0].id : v.activeId

      return { ...v, presets, activeId }
    })

  const setLabel = (id: string, label: string) =>
    setConfig((v) => ({
      ...v,
      presets: v.presets.map((p) => (p.id === id ? { ...p, label } : p)),
    }))

  const setCell = (index: number, text: string) =>
    setConfig((v) => ({
      ...v,
      presets: v.presets.map((p) =>
        p.id === v.activeId
          ? { ...p, cells: p.cells.map((c, i) => (i === index ? text : c)) }
          : p
      ),
    }))

  const active = activePreset(config)
  const count = Math.max(1, config.rows * config.cols)

  return (
    <Style>
      <div className="grid-config">
        <TextField
          select
          label="行"
          value={config.rows}
          onChange={(e) => setGrid('rows', Number(e.target.value))}
        >
          {GRID_OPTIONS.map((n) => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="列"
          value={config.cols}
          onChange={(e) => setGrid('cols', Number(e.target.value))}
        >
          {GRID_OPTIONS.map((n) => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <Typography variant="caption" color="textSecondary">
        プリセット (▶ が表示中)
      </Typography>
      {config.presets.map((p) => (
        <div
          key={p.id}
          className="preset-row"
          data-active={p.id === config.activeId}
        >
          <Radio
            size="small"
            checked={p.id === config.activeId}
            onChange={() => patch({ activeId: p.id })}
            icon={<PlayArrow fontSize="small" color="disabled" />}
            checkedIcon={<PlayArrow fontSize="small" color="primary" />}
          />
          <TextField
            fullWidth
            placeholder="プリセット名"
            value={p.label}
            onChange={(e) => setLabel(p.id, e.target.value)}
          />
          <IconButton
            size="small"
            disabled={config.presets.length <= 1}
            onClick={() => removePreset(p.id)}
          >
            <Close fontSize="small" />
          </IconButton>
        </div>
      ))}
      <Button size="small" startIcon={<Add />} onClick={addPreset}>
        プリセット追加
      </Button>

      <Typography variant="caption" color="textSecondary">
        「{active?.label}」の内容 ({config.rows}×{config.cols})
      </Typography>
      <div
        className="cells"
        style={{ gridTemplateColumns: `repeat(${config.cols}, 1fr)` }}
      >
        {Array.from({ length: count }, (_, i) => (
          <TextField
            key={i}
            multiline
            placeholder={`#${i + 1}`}
            value={active?.cells[i] ?? ''}
            onChange={(e) => setCell(i, e.target.value)}
          />
        ))}
      </div>

      <div className="row">
        <TextField
          type="number"
          label="文字サイズ"
          value={config.fontSize}
          onChange={(e) => patch({ fontSize: Number(e.target.value) || 1 })}
        />
        <TextField
          select
          label="文字揃え"
          value={config.align}
          onChange={(e) => patch({ align: e.target.value as TextAlign })}
        >
          <MenuItem value="left">左</MenuItem>
          <MenuItem value="center">中央</MenuItem>
          <MenuItem value="right">右</MenuItem>
        </TextField>
      </div>

      <div className="row">
        <TextField
          select
          label="表の位置(横)"
          value={config.blockAlign}
          onChange={(e) => patch({ blockAlign: e.target.value as TextAlign })}
        >
          <MenuItem value="left">左</MenuItem>
          <MenuItem value="center">中央</MenuItem>
          <MenuItem value="right">右</MenuItem>
        </TextField>
        <TextField
          select
          label="表の位置(縦)"
          value={config.vAlign}
          onChange={(e) => patch({ vAlign: e.target.value as TextVAlign })}
        >
          <MenuItem value="top">上</MenuItem>
          <MenuItem value="middle">中央</MenuItem>
          <MenuItem value="bottom">下</MenuItem>
        </TextField>
        <TextField
          select
          label="スクロール"
          value={config.scroll}
          onChange={(e) => patch({ scroll: e.target.value as TextScroll })}
        >
          <MenuItem value="none">なし</MenuItem>
          <MenuItem value="vertical">縦</MenuItem>
          <MenuItem value="marquee">横</MenuItem>
        </TextField>
      </div>

      <div className="switches">
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={config.border}
              onChange={(e) => patch({ border: e.target.checked })}
            />
          }
          label="セルの罫線"
        />
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={config.fullWidth}
              onChange={(e) => patch({ fullWidth: e.target.checked })}
            />
          }
          label="横幅いっぱい"
        />
      </div>

      <div className="colors">
        <ColorField
          label="背景"
          value={config.bgColor}
          onChange={(bgColor) => patch({ bgColor })}
        />
        <ColorField
          label="文字"
          value={config.fontColor}
          onChange={(fontColor) => patch({ fontColor })}
        />
      </div>
    </Style>
  )
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .grid-config,
  .row,
  .colors {
    display: flex;
    gap: 8px;
  }
  .switches {
    display: flex;
    flex-wrap: wrap;
  }
  .grid-config > *,
  .row > * {
    flex: 1;
  }
  .preset-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .cells {
    display: grid;
    gap: 4px;
  }
`

export default TextConfigEditor
