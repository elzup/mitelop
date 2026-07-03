import { FormControlLabel, Switch } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { MirrorConfig } from '../../types'
import { RadioGroup } from '../forms/RadioGroup'

type Props = {
  config: MirrorConfig
  setConfig: Dispatch<SetStateAction<MirrorConfig>>
}

function MirrorConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={config.flipped}
            onChange={(e) =>
              setConfig((v) => ({ ...v, flipped: e.target.checked }))
            }
          />
        }
        label="左右反転"
      />
      <RadioGroup
        name="fit"
        value={config.fit}
        options={['contain', 'cover']}
        onSelect={(fit) => setConfig((v) => ({ ...v, fit }))}
      />
    </>
  )
}

export default MirrorConfigEditor
