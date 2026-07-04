import {
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { ClockConfig } from '../../types'
import { THEME_BG, THEME_FG } from '../../utils/themes'
import ColorField from '../forms/ColorField'
import { useAppTheme } from '../hooks/useAppTheme'
import { CLOCK_TIMEZONES } from './clockConfig'

type Props = {
  config: ClockConfig
  setConfig: Dispatch<SetStateAction<ClockConfig>>
}

function ClockConfigEditor({ config, setConfig }: Props) {
  const { resolve } = useAppTheme()

  return (
    <>
      <ColorField
        label="Back"
        value={config.bgColor}
        themeSentinel={THEME_BG}
        resolve={resolve}
        onChange={(bgColor) => setConfig((v) => ({ ...v, bgColor }))}
      />
      <ColorField
        label="Font"
        value={config.fontColor}
        themeSentinel={THEME_FG}
        resolve={resolve}
        onChange={(fontColor) => setConfig((v) => ({ ...v, fontColor }))}
      />
      <TextField
        select
        label="タイムゾーン"
        value={config.timeZone}
        onChange={(e) => setConfig((v) => ({ ...v, timeZone: e.target.value }))}
      >
        {CLOCK_TIMEZONES.map((tz) => (
          <MenuItem key={tz.value || 'local'} value={tz.value}>
            {tz.label}
          </MenuItem>
        ))}
      </TextField>
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
