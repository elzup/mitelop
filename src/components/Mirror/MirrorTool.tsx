import { useState } from 'react'
import styled from 'styled-components'
import { MirrorConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import MirrorAtom from './MirrorAtom'

function MirrorTool() {
  const { config, setConfig, mode, setMode } = useConfig<MirrorConfig>('sw', {
    flipped: true,
  })
  const [allowed, setAllowed] = useState<boolean>(false)

  return (
    <Style onMouseLeave={() => setMode('main')}>
      <MirrorAtom
        allowed={allowed}
        mirrored={config.flipped}
        onAllowClick={() => setAllowed(tru)}
      />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <button
            onClick={() => setConfig((v) => ({ ...v, flipped: !v.flipped }))}
          >
            Flip
          </button>
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
