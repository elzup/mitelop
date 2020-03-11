import styled from 'styled-components'
import { useSeconds } from 'use-seconds'
import { useEffect, useState } from 'react'
import { useStopwatch } from './useStopwatch'

const pad2 = (n: number) => `${n}`.padStart(2, '0')

const timeToStr = (t: number) => {
  const h = Math.floor((t / 60) * 60 * 1000)
  const m = Math.floor(((t % h) / 60) * 1000)
  const s = Math.floor(t / 1000)

  if (h > 0) return `${h}:${pad2(m)}:${pad2(s)}`
  if (m > 0) return `${m}:${pad2(s)}`
  return `${pad2(s)}`
}

function Stopwatch() {
  const [status, time, setStart, setPause, setReset] = useStopwatch()
  const [timeStr, setTimeStr] = useState<string>('0')

  useEffect(() => {
    setTimeStr(timeToStr(time))
  }, [time])

  return (
    <Style>
      <div />
      <div className="frame">
        <span className="time">{time}</span>
        <button onClick={set}>Stop</button>
      </div>
      <div />
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

export default Stopwatch
