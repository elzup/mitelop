import { IconButton } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import styled from 'styled-components'
import { IntervalConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { timeToStr } from '../hooks/useTimeStr'
import { OpenConfigButton } from '../OpenConfigButton'
import IntervalAtom from './IntervalAtom'
import { intervalDefaultConfig } from './intervalConfig'
import { useInterval } from './useInterval'

function IntervalTool() {
  const { config, mode, setMode } = useActiveSlot<IntervalConfig>(
    'gad-interval',
    intervalDefaultConfig,
    'interval'
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
        steps={int.steps}
        status={int.status}
        layout={config.layout}
      />

      <ConfigModal mode={mode}>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-interval" />
          <div className="controls">
            {int.status === 'stop' && (
              <IconButton onClick={() => int.start()}>
                <PlayArrowIcon />
              </IconButton>
            )}
            {int.status === 'run' && (
              <IconButton onClick={int.pause}>
                <PauseIcon />
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

export default IntervalTool
