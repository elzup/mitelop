import {
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { FrameGadgetConfig, FrameRatio } from '../../types'
import ColorField from '../forms/ColorField'
import { FRAME_RATIO_HINTS, FRAME_RATIO_OPTIONS } from './frameConfig'

type Props = {
  config: FrameGadgetConfig
  setConfig: Dispatch<SetStateAction<FrameGadgetConfig>>
}

function FrameConfigEditor({ config, setConfig }: Props) {
  const patch = (p: Partial<FrameGadgetConfig>) =>
    setConfig((v) => ({ ...v, ...p }))

  return (
    <Style>
      <div className="row">
        <TextField
          select
          label="アス比"
          value={config.ratio}
          helperText={FRAME_RATIO_HINTS[config.ratio]}
          onChange={(e) => patch({ ratio: e.target.value as FrameRatio })}
        >
          {FRAME_RATIO_OPTIONS.map((r) => (
            <MenuItem key={r} value={r}>
              <span className="ratio-opt">
                <b>{r}</b>
                <small>{FRAME_RATIO_HINTS[r]}</small>
              </span>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="number"
          label="枠線"
          value={config.borderWidth}
          onChange={(e) => patch({ borderWidth: Number(e.target.value) || 0 })}
        />
      </div>

      <TextField
        label="ラベル"
        value={config.label}
        onChange={(e) => patch({ label: e.target.value })}
      />

      <div className="colors">
        <ColorField
          label="枠線色"
          value={config.borderColor}
          onChange={(borderColor) => patch({ borderColor })}
        />
      </div>

      <FormControlLabel
        control={
          <Switch
            checked={config.filled}
            onChange={(e) => patch({ filled: e.target.checked })}
          />
        }
        label="塗りつぶし"
      />
      {config.filled && (
        <ColorField
          label="塗り色"
          value={config.bgColor}
          onChange={(bgColor) => patch({ bgColor })}
        />
      )}

      <FormControlLabel
        control={
          <Switch
            checked={config.rounded}
            onChange={(e) => patch({ rounded: e.target.checked })}
          />
        }
        label="角丸"
      />
    </Style>
  )
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .row {
    display: flex;
    gap: 8px;
  }
  .row > * {
    flex: 1;
  }
  .ratio-opt {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  .ratio-opt small {
    color: rgba(0, 0, 0, 0.55);
    font-size: 11px;
  }
`

export default FrameConfigEditor
