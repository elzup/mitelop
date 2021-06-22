import { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import { useSeconds } from 'use-seconds'
import { Typography } from '@material-ui/core'
import { ClockConfig, GadgetMode } from '../../types'
import { ConfigModal } from '../components'
import ColorSelectButton from '../ColorSelector'
import { useLocalStorage } from '../../utils/useLocalStorage'
import ClockAtom from './ClockAtom'

const RATE = 1.8

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
  const maxWidth = height * RATE
  const [dateStr, setDstr] = useState<string>('0000-00-00')
  const [tStrs, setTstrs] = useState<string[]>(['00', '00', '00'])
  const [mode, setMode] = useState<GadgetMode>('main')

  useEffect(() => {
    setDstr(toDateStr(time) + '　　')
    setTstrs(timeStr(time))
  }, [+time])

  return (
    <div
      ref={ref}
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('conf')}
    >
      <ClockAtom
        config={config}
        dateStr={dateStr}
        tStrs={tStrs}
        maxWidth={maxWidth}
      />
      {mode === 'conf' && (
        <ConfigModal onClose={() => setMode('main')}>
          <div>
            <Typography>Back:</Typography>
            <ColorSelectButton
              color={config.bgColor}
              onChange={(bgColor) => setConfig((v) => ({ ...v, bgColor }))}
            />
          </div>
          <div>
            <Typography>Font:</Typography>
            <ColorSelectButton
              color={config.fontColor}
              onChange={(fontColor) => setConfig((v) => ({ ...v, fontColor }))}
            />
          </div>
        </ConfigModal>
      )}
    </div>
  )
}

export default ClockTool
