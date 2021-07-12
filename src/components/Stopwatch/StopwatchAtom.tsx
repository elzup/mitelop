import { IconButton } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import StopIcon from '@material-ui/icons/Stop'
import styled from 'styled-components'
import { DummyMs } from '../DummyMs'

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
    <Style>
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
      <div />
    </Style>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-rows: 1fr max-content 1fr;
  .outer {
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

export default StopwatchAtom
