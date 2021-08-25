import styled from 'styled-components'
import { RulerConfig, RULER_ORIGINS, RULER_UNITS } from '../../types'
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
      <RulerAtom {...config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <RadioGroup
            name="origin"
            value={config.origin}
            divStyle={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            options={RULER_ORIGINS}
            onSelect={(origin) => setConfig((v) => ({ ...v, origin }))}
          />
          <RadioGroup
            name="unit"
            value={config.unit}
            options={RULER_UNITS}
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
