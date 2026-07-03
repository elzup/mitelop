import styled from 'styled-components'
import { RulerConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import RulerAtom from './RulerAtom'
import RulerConfigEditor from './RulerConfigEditor'
import { rulerDefaultConfig } from './rulerConfig'

function RulerTool() {
  const { config, setConfig, mode, setMode } = useConfig<RulerConfig>(
    'ruler',
    rulerDefaultConfig
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <RulerAtom {...config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <RulerConfigEditor config={config} setConfig={setConfig} />
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
