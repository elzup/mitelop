import { TextField } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { TimerConfig } from '../../types'

type Props = {
  config: TimerConfig
  setConfig: Dispatch<SetStateAction<TimerConfig>>
}

function TimerConfigEditor({ config, setConfig }: Props) {
  return (
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
  )
}

export default TimerConfigEditor
