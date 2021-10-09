import styled from 'styled-components'
import { PianoConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import PianoAtom from './PianoAtom'

function PianoTool() {
  const { /* config, setConfig,*/ mode, setMode } = useConfig<PianoConfig>(
    'piano',
    {}
  )

  return (
    <Style onMouseLeave={() => setMode('main')}>
      <PianoAtom />
      <ConfigModal miniOver mode={mode}>
        <div className="over"></div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
`

export default PianoTool
