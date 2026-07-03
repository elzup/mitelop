import styled from 'styled-components'
import { SetSquareConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import SetSquareAtom from './SetSquareAtom'
import { setSquareDefaultConfig } from './setSquareConfig'

function SetSquareTool() {
  const { config, mode, setMode } = useActiveSlot<SetSquareConfig>(
    'gad-setsquare',
    setSquareDefaultConfig
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <SetSquareAtom config={config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-setsquare" />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
`

export default SetSquareTool
