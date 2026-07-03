import { Dispatch, SetStateAction, useState } from 'react'
import { MirrorConfig } from '../../types'
import MirrorAtom from './MirrorAtom'

type Props = {
  config: MirrorConfig
  setConfig: Dispatch<SetStateAction<MirrorConfig>>
}

/** カメラ許可 (allowed) は runtime 状態なので Atom 側に閉じ込める。 */
function MirrorConfigAtom({ config }: Props) {
  const [allowed, setAllowed] = useState<boolean>(false)

  return (
    <MirrorAtom
      allowed={allowed}
      flipped={config.flipped}
      fit={config.fit}
      onAllowClick={() => {
        if (confirm('Can i turn on video camera?')) setAllowed(true)
      }}
    />
  )
}

export default MirrorConfigAtom
