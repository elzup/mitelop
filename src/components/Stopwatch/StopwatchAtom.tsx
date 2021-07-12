import styled from 'styled-components'
import { DummyMs } from '../DummyMs'
import { UseStopwatch } from './useStopwatch'

type Props = {
  timeStr: string
  timeMilliStr: string
  onClickRun: () => void
  onClickPause: () => void
  onClickReset: () => void
  startTime: number
  status: 'run' | 'pause' | 'init'
}

function StopwatchAtom({
  timeStr,
  timeMilliStr,
  onClickRun,
  onClickPause,
  onClickReset,
  startTime,
  status,
}: Props) {
  return (
    <Style>
      <div className="outer">
        <span className="time">
          {timeStr}.
          <span className="time-ms">
            {status === 'run' ? <DummyMs ms={startTime} /> : timeMilliStr}
          </span>
        </span>

        <button onClick={onClickRun}>
          {status === 'init' ? 'Start' : 'Resume'}
        </button>

        {status === 'run' && <button onClick={onClickPause}>Stop</button>}
        <button onClick={onClickReset}>Reset</button>
      </div>
      <div />
    </Style>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-rows: 1fr max-content 1fr;
  .outer {
    display: grid;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
    span {
      text-align: center;
      font-size: calc(100%);
      line-height: 1.05em;

      &.date {
        text-align: unset;
        font-size: calc(100% / 5 / 3);
      }
    }
  }
`

export default StopwatchAtom
