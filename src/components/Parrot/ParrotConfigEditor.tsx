import { TextField } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { ParrotConfig } from '../../types'

type Props = {
  config: ParrotConfig
  setConfig: Dispatch<SetStateAction<ParrotConfig>>
}

// value 制御にして他ウィンドウからの変更も反映する (元は defaultValue で非制御だった)
function ParrotConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <TextField
        type="number"
        label="Speed"
        fullWidth
        size="small"
        value={config.pitch}
        inputProps={{ min: 0.1, max: 10.0, step: 0.1 }}
        onChange={(e) =>
          setConfig((v) => ({ ...v, pitch: Number(e.target.value) }))
        }
      />
      <TextField
        type="number"
        label="Rate"
        size="small"
        fullWidth
        value={config.rate}
        inputProps={{ min: 0, max: 2.0, step: 0.1 }}
        onChange={(e) =>
          setConfig((v) => ({ ...v, rate: Number(e.target.value) }))
        }
      />
    </>
  )
}

export default ParrotConfigEditor
