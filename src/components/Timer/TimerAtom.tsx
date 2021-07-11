import { LinearProgress } from '@material-ui/core'
import styled from 'styled-components'
import SizeDef from '../SizeDef'
import { TimerStatus } from './useTimer'

type Prop = {
  timeStr: string
  timeMilliStr: string
  total: number
  progress: number
  status: TimerStatus
}

function TimerAtom({ timeStr, timeMilliStr, progress }: Prop) {
  return (
    <SizeDef>
      <Style>
        <div className="frame">
          <span className="time">
            {timeStr}.<span className="time-ms">{timeMilliStr}</span>
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
  padding: 5%;
  .time {
    width: 20%;
    text-align: center;
    font-size: calc(var(--w) / 10);
    font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serifc;
    margin: 5%;
    line-height: 1.05em;
  }
  .time-ms {
    display: none;
    font-size: calc(100% / 3 / 2);
  }
  .frame {
    display: grid;
    height: 100%;
    grid-template-columns: max-content 1fr;
    display: grid;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
  }
  .controls {
    height: 100%;
    width: 100%;
    padding: 4px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    line-height: 100%;
    text-align: center;
    /* z-index: 1; */
    .sub-control {
      position: absolute;
      top: 0;
      left: 0;
    }
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
