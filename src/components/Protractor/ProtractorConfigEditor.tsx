import { Slider, TextField, Typography } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { ProtractorConfig } from '../../types'
import ColorField from '../forms/ColorField'
import { RadioGroup } from '../forms/RadioGroup'

type Props = {
  config: ProtractorConfig
  setConfig: Dispatch<SetStateAction<ProtractorConfig>>
}

function ProtractorConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <RadioGroup
        name="shape"
        value={config.shape}
        options={['half', 'full']}
        onSelect={(shape) => setConfig((v) => ({ ...v, shape }))}
      />
      <TextField
        type="number"
        label="ラベル刻み (deg)"
        value={config.labelStep}
        inputProps={{ min: 0, max: 90, step: 5 }}
        onChange={(e) =>
          setConfig((v) => ({ ...v, labelStep: Number(e.target.value) }))
        }
      />
      <TextField
        type="number"
        label="回転 (deg)"
        value={config.rotation}
        onChange={(e) =>
          setConfig((v) => ({ ...v, rotation: Number(e.target.value) }))
        }
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

export default ProtractorConfigEditor
