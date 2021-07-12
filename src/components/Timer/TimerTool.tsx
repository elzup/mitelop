import { IconButton, TextField } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import SettingsIcon from '@material-ui/icons/Settings'
import StopIcon from '@material-ui/icons/Stop'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TimerConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import TimerAtom from './TimerAtom'
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

function TimerTool() {
  const sw = useTimer()
  const [timeStr, setTimeStr] = useState<string>('0')
  const [timeMilliStr, setTimeMilliStr] = useState<string>('00')

  const { config, setConfig, mode, setMode } = useConfig<TimerConfig>('timer', {
    total: 10,
  })

  useEffect(() => {
    const [timeStr, milliStr] = timeToStr(sw.flootTime)

    setTimeStr(timeStr)
    setTimeMilliStr('00')
    if (sw.status === 'pause') {
      setTimeMilliStr(milliStr)
    }
  }, [+sw.time, sw.status])
  useEffect(() => {
    sw.setTime(config.total)
  }, [config.total])

  return (
    <Style onMouseEnter={() => setMode('over')}>
      <TimerAtom
        total={config.total}
        timeStr={timeStr}
        timeMilliStr={timeMilliStr}
        progress={sw.progress}
        startTime={sw.startTime}
        status={sw.status}
      />

      <ConfigModal mode={mode} onLeave={() => setMode('main')}>
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

export default TimerTool
