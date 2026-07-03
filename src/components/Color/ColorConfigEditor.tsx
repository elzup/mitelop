import { Dispatch, SetStateAction } from 'react'
import { ColorConfig } from '../../types'
import ColorField from '../forms/ColorField'

type Props = {
  config: ColorConfig
  setConfig: Dispatch<SetStateAction<ColorConfig>>
}

function ColorConfigEditor({ config, setConfig }: Props) {
  return (
    <ColorField
      label="Color"
      value={config.color}
      onChange={(color) => setConfig((v) => ({ ...v, color }))}
    />
  )
}

export default ColorConfigEditor
