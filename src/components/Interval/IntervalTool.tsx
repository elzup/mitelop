import { IconButton, TextField } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import SettingsIcon from '@material-ui/icons/Settings'
import StopIcon from '@material-ui/icons/Stop'
import styled from 'styled-components'
import { IntervalConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import { useTimeStr } from '../hooks/useTimeStr'
import IntervalAtom from './IntervalAtom'
import { useInterval } from './useInterval'

function IntervalTool() {
  const { config, setConfig, mode, setMode } = useConfig<IntervalConfig>(
    'interval',
    {
      steps: [
        { name: 'A', sec: 30 },
        { name: 'B', sec: 30 },
      ],
    }
  )
  const sw = useInterval(config.steps)
  const [timeStr, timeMilliStr] = useTimeStr(sw.time, sw.status)

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <IntervalAtom
        total={config.total}
        timeStr={timeStr}
        timeMilliStr={timeMilliStr}
        progress={sw.progress}
        startTime={sw.startTime}
        status={sw.status}
      />

      <ConfigModal mode={mode}>
        <div className="over">
          <IconButton
            disabled={sw.status === 'run'}
            onClick={() => setMode('conf')}
          >
            <SettingsIcon />
          </IconButton>
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

        <div className="conf">
          <div>
            <TextField
              label="min"
              type="number"
              value={Math.floor(config.total / 1000 / 60)}
              onChange={(e) =>
                setConfig((v) => ({
                  ...v,
                  total: parseInt(e.target.value || '') * 1000 * 60,
                }))
              }
            />
          </div>
          <div>
            <TextField
              label="sec"
              type="number"
              value={Math.floor(config.total / 1000)}
              onChange={(e) =>
                setConfig((v) => ({
                  ...v,
                  total: parseInt(e.target.value || '') * 1000,
                }))
              }
            />
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

export default IntervalTool
