import { TextField } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { IntervalConfig } from '../../types'

type Props = {
  config: IntervalConfig
  setConfig: Dispatch<SetStateAction<IntervalConfig>>
}

/** `name:sec` を 1 行 1 ステップで編集する。パーサは元 Tool と同じ。 */
function IntervalConfigEditor({ config, setConfig }: Props) {
  return (
    <TextField
      label="steps"
      multiline
      value={config.steps.map((v) => `${v.name}:${v.sec}`).join('\n')}
      onChange={(e) =>
        setConfig((prev) => ({
          ...prev,
          steps: e.target.value.split('\n').map((v) => {
            const [name, sec] = v.split(':')

            return { name: name || '', sec: +sec || 0 }
          }),
        }))
      }
    />
  )
}

export default IntervalConfigEditor
