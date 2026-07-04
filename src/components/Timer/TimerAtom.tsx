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
  /** 表示レイアウト (TIMER_LAYOUTS の id) */
  layout?: string
}

function TimerAtom({
  timeStr,
  timeMilliStr,
  startTime,
  progress,
  status,
  layout = 'bar',
}: Props) {
  return (
    <SizeDef>
      <Style data-status={status} data-layout={layout}>
        <div className="frame">
          <span className="time">
            {timeStr}.
            <span className="time-ms">
              {status === 'run' ? <DummyMs inv ms={startTime} /> : timeMilliStr}
            </span>
          </span>
          {layout !== 'plain' && (
            <LinearProgress variant="determinate" value={progress} />
          )}
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
    font-size: calc(var(--w) / 11);
    /* font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif; */
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

  /* 時刻のみ: バーを消し、時刻を大きく中央に */
  &[data-layout='plain'] {
    .frame {
      grid-template-columns: 1fr;
    }
    .time {
      width: 100%;
      font-size: calc(var(--w) / 6);
    }
  }

  /* 時刻+バー(縦): 時刻を上、バーを下段に積む */
  &[data-layout='stack'] {
    .frame {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr max-content;
    }
    .time {
      width: 100%;
      font-size: calc(var(--w) / 6);
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
