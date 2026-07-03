import { useState } from 'react'
import styled from 'styled-components'
import { MirrorConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import MirrorAtom from './MirrorAtom'
import MirrorConfigEditor from './MirrorConfigEditor'
import { mirrorDefaultConfig } from './mirrorConfig'

function MirrorTool() {
  const { config, setConfig, mode, setMode } = useConfig<MirrorConfig>(
    'mirror',
    mirrorDefaultConfig
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
          <MirrorConfigEditor config={config} setConfig={setConfig} />
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
