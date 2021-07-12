import { LinearProgress } from '@material-ui/core'
import styled from 'styled-components'
import { DummyMs } from '../DummyMs'
import SizeDef from '../SizeDef'
import { TimerStatus } from './useTimer'

type Props = {
  timeStr: string
  timeMilliStr: string
  total: number
  progress: number
  startTime: number
  status: TimerStatus
}

function TimerAtom({
  timeStr,
  timeMilliStr,
  startTime,
  progress,
  status,
}: Props) {
  return (
    <SizeDef>
      <Style data-status={status}>
        <div className="frame">
          <span className="time">
            {timeStr}.
            <span className="time-ms">
              {status === 'run' ? <DummyMs inv ms={startTime} /> : timeMilliStr}
            </span>
          </span>
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </Style>
    </SizeDef>
  )
}
TimerAtom.defaultProps = {
  total: 60,
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 3%;
  .time {
    width: 20%;
    text-align: center;
    font-size: calc(var(--w) / 10);
    font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif;
    margin: 5%;
    line-height: 1.05em;
  }
  .time-ms {
    /* display: none; */
    font-size: calc(var(--w) / 10 / 2);
  }
  .frame {
    display: grid;
    height: 100%;
    grid-template-columns: max-content 1fr;
    gap: 2%;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
  }
  &[data-status='end'] {
    animation: blinkAnimeS2 0.5s infinite alternate;
  }
  @keyframes blinkAnimeS2 {
    0% {
      background: white;
    }
    100% {
      background: red;
    }
  }
`

export default TimerAtom
