import { IconButton } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { DummyMs } from '../DummyMs'
import SizeDef from '../SizeDef'

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
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const RATE = 1.8
  const maxWidth = height * RATE
  const maxHeight = width / RATE

  return (
    <Style
      ref={ref}
      style={{
        // @ts-ignore
        '--w': `${Math.min(width, maxWidth)}px`,
        '--h': `${Math.min(height, maxHeight)}px`,
      }}
    >
      <div className="outer">
        <span className="time">
          {timeStr}.
          <span className="time-ms">
            {status === 'run' ? <DummyMs ms={startTime} /> : timeMilliStr}
          </span>
        </span>

        <div className="controls">
          {status === 'run' ? (
            <IconButton onClick={onClickPause}>
              <PauseIcon />
            </IconButton>
          ) : (
            <IconButton onClick={onClickRun}>
              <PlayArrowIcon />
            </IconButton>
          )}

          <IconButton disabled={status === 'run'} onClick={onClickReset}>
            <StopIcon />
          </IconButton>
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  display: grid;
  .outer {
    display: grid;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
    .time {
      font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif;
      text-align: center;
      font-size: calc(var(--w) * 0.15);
    }
    .controls {
      display: flex;
      justify-content: center;

      .MuiSvgIcon-root {
        font-size: calc(var(--w) * 0.15);
      }
    }
  }
`

export default StopwatchAtom
