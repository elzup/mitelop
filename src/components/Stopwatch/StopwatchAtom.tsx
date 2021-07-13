import { IconButton } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
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
  return (
    <SizeDef portRate={1.6} landRate={2}>
      <Style>
        <div className="outer">
          <div className="inner">
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
        </div>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .outer {
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;

    .inner {
      max-width: var(--w);
      max-height: var(--h);
      text-align: center;
    }
    .time {
      font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif;
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
