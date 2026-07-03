import { useState } from 'react'
import styled from 'styled-components'
import { MirrorConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import MirrorAtom from './MirrorAtom'
import { mirrorDefaultConfig } from './mirrorConfig'

function MirrorTool() {
  const { config, mode, setMode } = useActiveSlot<MirrorConfig>(
    'gad-mirror',
    mirrorDefaultConfig,
    'mirror'
  )
  const [allowed, setAllowed] = useState<boolean>(false)

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <MirrorAtom
        allowed={allowed}
        flipped={config.flipped}
        fit={config.fit}
        onAllowClick={() => {
          if (confirm('Can i turn on video camera?')) setAllowed(true)
        }}
      />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-mirror" />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
`

export default MirrorTool
