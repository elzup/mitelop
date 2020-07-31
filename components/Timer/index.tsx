import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import { useTimer } from './useTimer'

const pad2 = (n: number) => `${n}`.padStart(2, '0')

const timeToStr = (t: number, showUnder = false) => {
  const SEC = 1000
  const MIN = 60 * SEC
  const HOU = 60 * MIN
  const h = Math.floor(t / HOU)
  const m = Math.floor((t % HOU) / MIN)
  const s = Math.floor((t % MIN) / SEC)
  const milli = showUnder ? `.${pad2(Math.floor((t % SEC) / 10))}` : ''

  if (h > 0) return `${h}:${pad2(m)}:${pad2(s)}` + milli
  if (m > 0) return `${m}:${pad2(s)}` + milli
  return `${s}` + milli
}

function Timer({ total }: { total: number }) {
  const sw = useTimer()
  const [timeStr, setTimeStr] = useState<string>('0')

  useEffect(() => {
    setTimeStr(
      timeToStr(
        sw.time - (sw.status === 'run' ? 1000 : 0),
        sw.status === 'pause'
      )
    )
  }, [+sw.time, sw.status])
  useEffect(() => {
    sw.setTime(total)
  }, [total])

  const progress = (1 - sw.time / total) * 100

  return (
    <Style>
      <div className="frame">
        <LinearProgress variant="determinate" value={progress} />
        <span className="time">{timeStr}</span>
        <div className="controls">
          {sw.status === 'init' && (
            <button onClick={() => sw.start()}>Start</button>
          )}
          {sw.status === 'pause' && (
            <>
              <button onClick={() => sw.resume()}>Resume</button>
              <button onClick={() => sw.reset()}>Reset</button>
            </>
          )}
          {sw.status === 'run' && (
            <button onClick={() => sw.pause()}>Pause</button>
          )}
          {sw.status === 'end' && (
            <button onClick={() => sw.reset()}>Reset</button>
          )}
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr max-content 1fr;
  .frame {
    display: grid;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
    span {
      text-align: center;
      font-size: calc(100vw / 5);
      line-height: 1.05em;

      &.date {
        text-align: unset;
        font-size: calc(100vw / 5 / 3);
      }
    }
  }
`

export default Timer
