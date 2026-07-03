import { FormControlLabel, Switch } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { RulerConfig, RULER_ORIGINS, RULER_UNITS } from '../../types'
import { RadioGroup } from '../forms/RadioGroup'

type Props = {
  config: RulerConfig
  setConfig: Dispatch<SetStateAction<RulerConfig>>
}

function RulerConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <RadioGroup
        name="origin"
        value={config.origin}
        divStyle={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
        options={RULER_ORIGINS}
        onSelect={(origin) => setConfig((v) => ({ ...v, origin }))}
      />
      <RadioGroup
        name="unit"
        value={config.unit}
        options={RULER_UNITS}
        onSelect={(unit) => setConfig((v) => ({ ...v, unit }))}
      />
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={config.transparent}
            onChange={(e) =>
              setConfig((v) => ({ ...v, transparent: e.target.checked }))
            }
          />
        }
        label="背景を透過"
      />
    </>
  )
}

export default RulerConfigEditor
