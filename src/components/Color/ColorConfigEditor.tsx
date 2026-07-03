import { Typography } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { ColorConfig, COLOR_SHAPES } from '../../types'
import ColorField from '../forms/ColorField'
import { RadioGroup } from '../forms/RadioGroup'

type Props = {
  config: ColorConfig
  setConfig: Dispatch<SetStateAction<ColorConfig>>
}

function ColorConfigEditor({ config, setConfig }: Props) {
  return (
    <>
      <ColorField
        label="Color"
        value={config.color}
        onChange={(color) => setConfig((v) => ({ ...v, color }))}
      />
      <Typography variant="caption" color="textSecondary">
        形
      </Typography>
      <RadioGroup
        name="shape"
        value={config.shape ?? 'fill'}
        divStyle={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
        options={[...COLOR_SHAPES]}
        onSelect={(shape) => setConfig((v) => ({ ...v, shape }))}
      />
    </>
  )
}

export default ColorConfigEditor
