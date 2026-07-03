import styled from 'styled-components'
import { CompassConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import CompassAtom from './CompassAtom'
import { compassDefaultConfig } from './compassConfig'

function CompassTool() {
  const { config, mode, setMode } = useActiveSlot<CompassConfig>(
    'gad-compass',
    compassDefaultConfig
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <CompassAtom config={config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-compass" />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
`

export default CompassTool
