import { Dispatch, SetStateAction } from 'react'
import { RulerConfig } from '../../types'
import RulerAtom from './RulerAtom'

type Props = {
  config: RulerConfig
  setConfig: Dispatch<SetStateAction<RulerConfig>>
}

/** registry の {config,setConfig} 契約に合わせて flat props の RulerAtom を包む。 */
function RulerConfigAtom({ config }: Props) {
  return <RulerAtom {...config} />
}

export default RulerConfigAtom
