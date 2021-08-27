import { useState } from 'react'
import styled from 'styled-components'
import { MirrorConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import MirrorAtom from './MirrorAtom'

function MirrorTool() {
  const { config, setConfig, mode, setMode } = useConfig<MirrorConfig>(
    'mirror',
    { flipped: true, fit: 'contain' }
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
          <input
            type="checkbox"
            id="mirror-checkbox"
            onClick={() => setConfig((v) => ({ ...v, flipped: !v.flipped }))}
          ></input>
          <label htmlFor="mirror-checkbox">Flip</label>

          <div>
            <input
              type="radio"
              name="fit"
              value="cover"
              id="mirror-cover"
              checked={config.fit === 'cover'}
              onChange={() => setConfig((v) => ({ ...v, fit: 'cover' }))}
            />
            <label htmlFor="mirror-cover">cover</label>
          </div>
          <div>
            <input
              type="radio"
              name="fit"
              value="contain"
              id="mirror-contain"
              checked={config.fit === 'contain'}
              onChange={() => setConfig((v) => ({ ...v, fit: 'contain' }))}
            />
            <label htmlFor="mirror-contain">contain</label>
          </div>
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
