import { Dispatch, SetStateAction } from 'react'
import { ColorConfig } from '../../types'
import ColorAtom from './ColorAtom'

type Props = {
  config: ColorConfig
  setConfig: Dispatch<SetStateAction<ColorConfig>>
}

function ColorConfigAtom({ config }: Props) {
  return <ColorAtom config={config} />
}

export default ColorConfigAtom
