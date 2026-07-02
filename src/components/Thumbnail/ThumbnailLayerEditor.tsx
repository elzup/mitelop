import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components'
import { THUMBNAIL_ANCHORS, ThumbnailTextLayer } from '../../types'
import ColorField from '../forms/ColorField'

type Props = {
  title: string
  layer: ThumbnailTextLayer
  onChange: (next: ThumbnailTextLayer) => void
}

const ANCHOR_LABEL: Record<string, string> = {
  'top-left': '左上',
  'top-center': '上',
  'top-right': '右上',
  'middle-left': '左',
  'middle-center': '中央',
  'middle-right': '右',
  'bottom-left': '左下',
  'bottom-center': '下',
  'bottom-right': '右下',
}

const ThumbnailLayerEditor = ({ title, layer, onChange }: Props) => {
  const patch = (next: Partial<ThumbnailTextLayer>) =>
    onChange({ ...layer, ...next })

  return (
    <Style>
      <Typography variant="subtitle2">{title}</Typography>
      <TextField
        label="テキスト (改行可)"
        size="small"
        multiline
        fullWidth
        value={layer.text}
        onChange={(e) => patch({ text: e.target.value })}
      />
      <div className="row">
        <TextField
          label="サイズ(px)"
          type="number"
          size="small"
          value={layer.fontSize}
          onChange={(e) => patch({ fontSize: Number(e.target.value) || 0 })}
        />
        <TextField
          label="縁取り幅(px)"
          type="number"
          size="small"
          value={layer.strokeWidth}
          onChange={(e) => patch({ strokeWidth: Number(e.target.value) || 0 })}
        />
      </div>
      <div className="row">
        <ColorField
          label="文字色"
          value={layer.color}
          onChange={(color) => patch({ color })}
        />
        <ColorField
          label="縁取り色"
          value={layer.strokeColor}
          onChange={(strokeColor) => patch({ strokeColor })}
        />
      </div>
      <div className="row">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={layer.bold}
              onChange={(e) => patch({ bold: e.target.checked })}
            />
          }
          label="太字"
        />
      </div>
      <div className="anchors">
        {THUMBNAIL_ANCHORS.map((anchor) => (
          <button
            key={anchor}
            type="button"
            data-active={layer.anchor === anchor}
            onClick={() => patch({ anchor })}
          >
            {ANCHOR_LABEL[anchor]}
          </button>
        ))}
      </div>
    </Style>
  )
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
  border-top: solid 1px #ddd;
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .anchors {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    max-width: 220px;
    button {
      padding: 6px 0;
      font-size: 0.75rem;
      border: solid 1px #2b0065;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
      &[data-active='true'] {
        background: #2b0065;
        color: #fff;
      }
    }
  }
`

export default ThumbnailLayerEditor
