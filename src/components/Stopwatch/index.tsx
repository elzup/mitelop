import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { DummyMs } from '../DummyMs'
import { useStopwatch } from './useStopwatch'

const pad2 = (n: number) => `${n}`.padStart(2, '0')

const toTimeMilliStr = (t: number, showUnder = false) => {
  return `.${pad2(t % 1000)}`
}

const timeToStr = (t: number, showUnder = false) => {
  const SEC = 1000
  const MIN = 60 * SEC
  const HOU = 60 * MIN
  const h = Math.floor(t / HOU)
  const m = Math.floor((t % HOU) / MIN)
  const s = Math.floor((t % MIN) / SEC)

  if (h > 0) return `${h}:${pad2(m)}:${pad2(s)}`
  if (m > 0) return `${m}:${pad2(s)}`
  return `${s}`
}

function Stopwatch() {
  const sw = useStopwatch()
  const [timeStr, setTimeStr] = useState<string>('0')
  const [timeMilliStr, setTimeMilliStr] = useState<string>('000')

  useEffect(() => {
    setTimeStr(timeToStr(sw.time, sw.status === 'pause'))
    setTimeMilliStr(toTimeMilliStr(sw.time))
  }, [+sw.time])

  return (
    <Style>
      <div className="frame">
        <span className="time">{timeStr}</span>
        <span>
          .{sw.status === 'run' ? <DummyMs ms={sw.startTime} /> : timeMilliStr}
        </span>
        {sw.status === 'pause' && (
          <button onClick={() => sw.run()}>
            {sw.time === 0 ? 'Start' : 'Resume'}
          </button>
        )}
        {sw.status === 'run' && (
          <button onClick={() => sw.pause()}>Stop</button>
        )}
        <button onClick={() => sw.reset()}>Reset</button>
      </div>
      <div />
    </Style>
  )
}

const Style = styled.div`
  height: 100%;
  display: grid;
  position: relative;
  grid-template-rows: 1fr max-content 1fr;
  .frame {
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

export default Stopwatch
