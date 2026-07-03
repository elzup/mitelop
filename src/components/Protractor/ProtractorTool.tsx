import styled from 'styled-components'
import { ProtractorConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import ProtractorAtom from './ProtractorAtom'
import { protractorDefaultConfig } from './protractorConfig'

function ProtractorTool() {
  const { config, mode, setMode } = useActiveSlot<ProtractorConfig>(
    'gad-protractor',
    protractorDefaultConfig
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <ProtractorAtom config={config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-protractor" />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
`

export default ProtractorTool
