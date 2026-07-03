import {
  FormControlLabel,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { SetSquareConfig } from '../../types'
import ColorField from '../forms/ColorField'
import { RadioGroup } from '../forms/RadioGroup'

type Props = {
  config: SetSquareConfig
  setConfig: Dispatch<SetStateAction<SetSquareConfig>>
}

function SetSquareConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <RadioGroup
        name="variant"
        value={config.variant}
        options={['45', '30-60']}
        onSelect={(variant) => setConfig((v) => ({ ...v, variant }))}
      />
      <TextField
        type="number"
        label="回転 (deg)"
        value={config.rotation}
        onChange={(e) =>
          setConfig((v) => ({ ...v, rotation: Number(e.target.value) }))
        }
      />
      <FormControlLabel
        control={
          <Switch
            checked={config.flipped}
            onChange={(e) =>
              setConfig((v) => ({ ...v, flipped: e.target.checked }))
            }
          />
        }
        label="左右反転"
      />
      <ColorField
        label="Color"
        value={config.color}
        onChange={(color) => setConfig((v) => ({ ...v, color }))}
      />
      <Typography variant="caption" color="textSecondary">
        塗り {Math.round(config.opacity * 100)}%
      </Typography>
      <Slider
        min={0}
        max={1}
        step={0.05}
        value={config.opacity}
        onChange={(_e, val) =>
          setConfig((v) => ({
            ...v,
            opacity: Array.isArray(val) ? val[0] : val,
          }))
        }
      />
    </>
  )
}

export default SetSquareConfigEditor
