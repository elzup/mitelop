import { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import { useSeconds } from 'use-seconds'
import SettingsIcon from '@material-ui/icons/Settings'
import { IconButton } from '@material-ui/core'
import { ClockConfig, GadgetMode } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { ConfigModal } from '../components'
import ColorField from '../forms/ColorField'
import ClockAtom from './ClockAtom'

const pad2 = (n: number) => `${n}`.padStart(2, '0')
const toDateStr = (t: Date) =>
  `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`
const timeStr = (t: Date) =>
  [t.getHours(), t.getMinutes(), t.getSeconds()].map(pad2)

const initConfig: ClockConfig = {
  dateVisible: true,
  bgColor: '#aaaaff',
  fontColor: '#000066',
}

function ClockTool() {
  const [time] = useSeconds()
  const [config, setConfig] = useLocalStorage<ClockConfig>(
    'config-clock',
    initConfig
  )

  const [ref, { height }] = useMeasure<HTMLDivElement>()
  const [dateStr, setDstr] = useState<string>('0000-00-00')
  const [tStrs, setTstrs] = useState<string[]>(['00', '00', '00'])
  const [mode, setMode] = useState<GadgetMode>('main')

  useEffect(() => {
    setDstr(toDateStr(time))
    setTstrs(timeStr(time))
  }, [+time])
  const miniConf = height < 400

  return (
    <div
      ref={ref}
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
    >
      <ClockAtom config={config} dateStr={dateStr} tStrs={tStrs} />

      <ConfigModal visible={mode !== 'main'} onClose={() => setMode('main')}>
        <div style={{ display: mode === 'over' ? 'block' : 'none' }}>
          <IconButton onClick={() => setMode('conf')}>
            <SettingsIcon />
          </IconButton>
        </div>

        <div style={{ display: mode === 'conf' ? 'block' : 'none' }}>
          <ColorField
            label="Back"
            onChange={(bgColor) => setConfig((v) => ({ ...v, bgColor }))}
            value={config.bgColor}
            mini={miniConf}
          />
          <ColorField
            label="Font"
            onChange={(fontColor) => setConfig((v) => ({ ...v, fontColor }))}
            value={config.fontColor}
            mini={miniConf}
          />
        </div>
      </ConfigModal>
    </div>
  )
}

export default ClockTool
