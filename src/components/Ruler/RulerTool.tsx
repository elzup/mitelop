import styled from 'styled-components'
import { RulerConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import RulerAtom from './RulerAtom'

function RulerTool() {
  const { config, setConfig, mode, setMode } = useConfig<RulerConfig>('ruler', {
    line: 'simple',
  })

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <RulerAtom />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <div>
            <input
              type="radio"
              name="simple"
              value="cover"
              id="ruler-simple"
              checked={config.line === 'simple'}
              onChange={() => setConfig((v) => ({ ...v, line: 'simple' }))}
            />
            <label htmlFor="ruler-simple">simple</label>
          </div>
          <div>
            <input
              type="radio"
              name="multiple"
              value="contain"
              id="ruler-multiple"
              checked={config.line === 'multiple'}
              onChange={() => setConfig((v) => ({ ...v, line: 'multiple' }))}
            />
            <label htmlFor="ruler-multiple">multiple</label>
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

export default RulerTool
