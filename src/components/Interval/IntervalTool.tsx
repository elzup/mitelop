import { IconButton, TextField } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'
import { IntervalConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import { timeToStr } from '../hooks/useTimeStr'
import IntervalAtom from './IntervalAtom'
import { useInterval } from './useInterval'

function IntervalTool() {
  const { config, setConfig, mode, setMode } = useConfig<IntervalConfig>(
    'interval',
    {
      steps: [
        { name: 'A', sec: 5 },
        { name: 'B', sec: 10 },
        { name: 'C', sec: 15 },
      ],
    }
  )

  const steps = config.steps.filter((v) => v.name !== '')
  const int = useInterval(steps)
  const ts = timeToStr(int.startTime)

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <IntervalAtom
        timeStr={ts[0]}
        timeMiliStr={ts[1]}
        progress={int.progress}
        steps={steps}
        status={int.status}
      />

      <ConfigModal mode={mode}>
        <div className="over">
          <IconButton
            disabled={int.status === 'run'}
            onClick={() => setMode('conf')}
          >
            <SettingsIcon />
          </IconButton>
          <div className="controls">
            {int.status === 'stop' && (
              <>
                <IconButton onClick={() => int.start()}>
                  <PlayArrowIcon />
                </IconButton>
              </>
            )}
            {int.status === 'run' && (
              <IconButton onClick={int.pause}>
                <PauseIcon />
              </IconButton>
            )}
          </div>
        </div>

        <div className="conf">
          <div>
            <TextField
              label="steps"
              multiline
              value={config.steps.map((v) => `${v.name}:${v.sec}`).join('\n')}
              onChange={(e) =>
                setConfig({
                  steps: e.target.value.split('\n').map((v, i) => {
                    const [name, sec] = v.split(':')

                    return { name: name || '', sec: +sec || 0 }
                  }),
                })
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
