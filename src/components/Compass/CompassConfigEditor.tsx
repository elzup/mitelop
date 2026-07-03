import { FormControlLabel, Switch, TextField } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { CompassConfig } from '../../types'
import ColorField from '../forms/ColorField'

type Props = {
  config: CompassConfig
  setConfig: Dispatch<SetStateAction<CompassConfig>>
}

function CompassConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <TextField
        type="number"
        label="円の本数"
        value={config.rings}
        inputProps={{ min: 1, max: 12 }}
        onChange={(e) =>
          setConfig((v) => ({ ...v, rings: Number(e.target.value) }))
        }
      />
      <TextField
        type="number"
        label="線の太さ"
        value={config.lineWidth}
        inputProps={{ min: 0.4, max: 5, step: 0.2 }}
        onChange={(e) =>
          setConfig((v) => ({ ...v, lineWidth: Number(e.target.value) }))
        }
      />
      <FormControlLabel
        control={
          <Switch
            checked={config.crosshair}
            onChange={(e) =>
              setConfig((v) => ({ ...v, crosshair: e.target.checked }))
            }
          />
        }
        label="十字線"
      />
      <ColorField
        label="Color"
        value={config.color}
        onChange={(color) => setConfig((v) => ({ ...v, color }))}
      />
    </>
  )
}

export default CompassConfigEditor
