import { TextField, Typography } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { TimerConfig } from '../../types'
import { RadioGroup } from '../forms/RadioGroup'

type Props = {
  config: TimerConfig
  setConfig: Dispatch<SetStateAction<TimerConfig>>
}

function TimerConfigEditor({ config, setConfig }: Props) {
  const mode = config.mode ?? 'duration'

  return (
    <>
      <Typography variant="caption" color="textSecondary">
        モード
      </Typography>
      <RadioGroup
        name="mode"
        value={mode}
        options={['duration', 'target']}
        onSelect={(m) => setConfig((v) => ({ ...v, mode: m }))}
      />
      {mode === 'duration' ? (
        <>
          <TextField
            label="min"
            type="number"
            value={Math.floor(config.total / 1000 / 60)}
            onChange={(e) =>
              setConfig((v) => ({
                ...v,
                total: parseInt(e.target.value || '') * 1000 * 60,
              }))
            }
          />
          <TextField
            label="sec"
            type="number"
            value={Math.floor(config.total / 1000)}
            onChange={(e) =>
              setConfig((v) => ({
                ...v,
                total: parseInt(e.target.value || '') * 1000,
              }))
            }
          />
        </>
      ) : (
        <TextField
          label="目標時刻"
          type="time"
          value={config.targetTime}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setConfig((v) => ({ ...v, targetTime: e.target.value }))
          }
        />
      )}
    </>
  )
}

export default TimerConfigEditor
