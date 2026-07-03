import { IconButton } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import StopIcon from '@material-ui/icons/Stop'
import { useEffect } from 'react'
import styled from 'styled-components'
import { TimerConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { useTimeStr } from '../hooks/useTimeStr'
import { OpenConfigButton } from '../OpenConfigButton'
import TimerAtom from './TimerAtom'
import { timerDefaultConfig } from './timerConfig'
import { useTimer } from './useTimer'

function TimerTool() {
  const sw = useTimer()

  const { config, mode, setMode } = useActiveSlot<TimerConfig>(
    'gad-timer',
    timerDefaultConfig,
    'timer'
  )
  const [timeStr, timeMilliStr] = useTimeStr(sw.time, sw.status)

  useEffect(() => {
    sw.setTime(config.total)
  }, [config.total])

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <TimerAtom
        total={config.total}
        timeStr={timeStr}
        timeMilliStr={timeMilliStr}
        progress={sw.progress}
        startTime={sw.startTime}
        status={sw.status}
      />

      <ConfigModal mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-timer" />
          <div className="controls">
            {sw.status === 'init' && (
              <IconButton onClick={() => sw.start()}>
                <PlayArrowIcon />
              </IconButton>
            )}
            {sw.status === 'pause' && (
              <>
                <IconButton onClick={() => sw.resume()}>
                  <PlayArrowIcon />
                </IconButton>
                <IconButton onClick={sw.reset}>
                  <StopIcon />
                </IconButton>
              </>
            )}
            {sw.status === 'run' && (
              <IconButton onClick={sw.pause}>
                <PauseIcon />
              </IconButton>
            )}
            {sw.status === 'end' && (
              <IconButton onClick={sw.reset}>
                <RotateLeftIcon />
              </IconButton>
            )}
          </div>
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export default TimerTool
