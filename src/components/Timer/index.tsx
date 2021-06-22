import { IconButton, LinearProgress } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import StopIcon from '@material-ui/icons/Stop'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHover } from '../hooks/useHover'
import { useTimer } from './useTimer'

const pad2 = (n: number) => `${n}`.padStart(2, '0')

const timeToStr = (t: number): [string, string] => {
  const SEC = 1000
  const MIN = 60 * SEC
  const HOU = 60 * MIN
  const h = Math.floor(t / HOU)
  const m = Math.floor((t % HOU) / MIN)
  const s = Math.floor((t % MIN) / SEC)
  const milli = pad2(Math.floor((t % SEC) / 10))

  if (h > 0) return [`${h}:${pad2(m)}:${pad2(s)}`, milli]
  if (m > 0) return [`${m}:${pad2(s)}`, milli]
  return [`${s}`, milli]
}

function Timer({ total }: { total: number }) {
  const sw = useTimer()
  const [timeStr, setTimeStr] = useState<string>('0')
  const [timeMilliStr, setTimeMilliStr] = useState<string>('00')
  const [hoverRef, isHovered] = useHover()

  useEffect(() => {
    const [timeStr, milliStr] = timeToStr(sw.floorTime)

    setTimeStr(timeStr)
    setTimeMilliStr('00')
    if (sw.status === 'pause') {
      setTimeMilliStr(milliStr)
    }
  }, [+sw.time, sw.status])
  useEffect(() => {
    sw.setTime(total)
  }, [total])

  return (
    <Style
      ref={hoverRef}
      onClick={() => {
        console.log('whole event')
        if (sw.status === 'init') {
          sw.start()
        } else if (sw.status === 'run') {
          sw.pause()
        } else if (sw.status === 'pause') {
          sw.resume()
        }
      }}
    >
      <div className="frame">
        <span className="time">
          {timeStr}.<span className="time-ms">{timeMilliStr}</span>
        </span>
        <LinearProgress variant="determinate" value={sw.progress} />
      </div>

      <div
        className="controls"
        style={{ display: isHovered ? 'block' : 'none' }}
      >
        {sw.status === 'init' && <PlayArrowIcon />}
        {sw.status === 'pause' && (
          <>
            <PlayArrowIcon />
            <IconButton
              className="sub-control"
              onClick={(e) => {
                sw.reset()
                e.stopPropagation()
              }}
            >
              <StopIcon />
            </IconButton>
          </>
        )}
        {sw.status === 'run' && <PauseIcon />}
        {sw.status === 'end' && (
          <IconButton
            className="sub-control"
            onClick={(e) => {
              sw.reset()
              e.stopPropagation()
            }}
          >
            <RotateLeftIcon />
          </IconButton>
        )}
      </div>
    </Style>
  )
}
Timer.defaultProps = {
  total: 60,
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  .time {
    width: 20%;
    text-align: center;
    font-size: calc(100% / 3);
    font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif;
    margin: 5%;
    line-height: 1.05em;
  }
  .time-ms {
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
`

export default Timer
