import { Slider, Typography } from '@material-ui/core'
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
      <Typography variant="caption" color="textSecondary">
        ラベル刻み (deg)
      </Typography>
      <RadioGroup
        name="labelStep"
        value={String(config.labelStep)}
        options={['10', '30', '45', '90', '180']}
        onSelect={(step) =>
          setConfig((v) => ({ ...v, labelStep: Number(step) }))
        }
      />
      <Typography variant="caption" color="textSecondary">
        回転 {config.rotation}°
      </Typography>
      <Slider
        min={0}
        max={360}
        step={1}
        value={config.rotation}
        onChange={(_e, val) =>
          setConfig((v) => ({
            ...v,
            rotation: Array.isArray(val) ? val[0] : val,
          }))
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
