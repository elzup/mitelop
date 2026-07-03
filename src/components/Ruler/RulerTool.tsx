import styled from 'styled-components'
import { RulerConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import RulerAtom from './RulerAtom'
import { rulerDefaultConfig } from './rulerConfig'

function RulerTool() {
  const { config, mode, setMode } = useActiveSlot<RulerConfig>(
    'gad-ruler',
    rulerDefaultConfig,
    'ruler'
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <RulerAtom {...config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-ruler" />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
`

export default RulerTool
