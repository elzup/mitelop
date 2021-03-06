import styled from 'styled-components'
import { StopwatchConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import { useTimeStr } from '../hooks/useTimeStr'
import StopwatchAtom from './StopwatchAtom'
import { useStopwatch } from './useStopwatch'

function StopwatchTool() {
  const sw = useStopwatch()

  const [timeStr, timeMilliStr] = useTimeStr(sw.time)
  const { /* config, setConfig,*/ mode, setMode } = useConfig<StopwatchConfig>(
    'sw',
    {}
  )

  return (
    <Style onMouseLeave={() => setMode('main')}>
      <StopwatchAtom
        onClickRun={sw.run}
        onClickPause={sw.pause}
        onClickReset={sw.reset}
        status={sw.status === 'pause' && sw.time === 0 ? 'init' : sw.status}
        startTime={sw.startTime}
        timeStr={timeStr}
        timeMilliStr={timeMilliStr}
      />
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

export default StopwatchTool
