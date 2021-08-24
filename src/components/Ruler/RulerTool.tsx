import styled from 'styled-components'
import { RulerConfig, rulerConfigOrigin, rulerConfigUnit } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { RadioGroup } from '../forms/RadioGroup'
import { useConfig } from '../hooks/useConfig'
import RulerAtom from './RulerAtom'

function RulerTool() {
  const { config, setConfig, mode, setMode } = useConfig<RulerConfig>('ruler', {
    unit: 'px',
    origin: 'center',
  })

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <RulerAtom />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <RadioGroup
            name="origin"
            value={config.origin}
            divStyle={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            options={rulerConfigOrigin}
            onSelect={(origin) => setConfig((v) => ({ ...v, origin }))}
          />
          <RadioGroup
            name="unit"
            value={config.unit}
            options={rulerConfigUnit}
            onSelect={(unit) => setConfig((v) => ({ ...v, unit }))}
          />
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
