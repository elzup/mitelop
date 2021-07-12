import { LinearProgress } from '@material-ui/core'
import { useState, useEffect } from 'react'

import styled from 'styled-components'
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
              {status === 'run' ? <DummyMs ms={startTime} /> : timeMilliStr}
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
    font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serifc;
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

function DummyMs({ ms: start }: { ms: number }) {
  const calc = () => (start - (+new Date() % 1000)) % 1000
  const [ms, setMs] = useState<number>(calc())

  useEffect(() => {
    setInterval(() => {
      setMs(calc())
    }, 20)
    return
  }, [])
  return <>{`${Math.floor(ms / 10)}`.padStart(2, '0') + ' '}</>
}

export default TimerAtom
