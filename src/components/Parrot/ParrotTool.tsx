import styled from 'styled-components'
import { ParrotConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import ParrotAtom from './ParrotAtom'
import { parrotDefaultConfig } from './parrotConfig'

function ParrotTool() {
  const { mode, setMode, config } = useActiveSlot<ParrotConfig>(
    'gad-parrot',
    parrotDefaultConfig,
    'parrot'
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <ParrotAtom config={config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-parrot" />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
`

export default ParrotTool
