import { FormControlLabel, Switch, TextField } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { ClockConfig } from '../../types'
import ColorField from '../forms/ColorField'

type Props = {
  config: ClockConfig
  setConfig: Dispatch<SetStateAction<ClockConfig>>
}

function ClockConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <ColorField
        label="Back"
        value={config.bgColor}
        onChange={(bgColor) => setConfig((v) => ({ ...v, bgColor }))}
      />
      <ColorField
        label="Font"
        value={config.fontColor}
        onChange={(fontColor) => setConfig((v) => ({ ...v, fontColor }))}
      />
      <TextField
        type="number"
        label="diffMinutes"
        value={config.diffMinutes}
        onChange={(e) =>
          setConfig((v) => ({ ...v, diffMinutes: Number(e.target.value) }))
        }
      />
      <FormControlLabel
        control={
          <Switch
            checked={config.dateVisible}
            onChange={(e) =>
              setConfig((v) => ({ ...v, dateVisible: e.target.checked }))
            }
          />
        }
        label="日付表示"
      />
    </>
  )
}

export default ClockConfigEditor
