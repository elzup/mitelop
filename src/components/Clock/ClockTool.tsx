import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useSeconds } from 'use-seconds'
import { ClockConfig } from '../../types'
import { ConfigModal } from '../components'
import ColorField from '../forms/ColorField'
import { useConfig } from '../hooks/useConfig'
import ClockAtom from './ClockAtom'

const pad2 = (n: number) => `${n}`.padStart(2, '0')
const toDateStr = (t: Date) =>
  `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`
const timeStr = (t: Date) =>
  [t.getHours(), t.getMinutes(), t.getSeconds()].map(pad2)

function useTimeStr() {
  const [time] = useSeconds()

  const [dateStr, setDstr] = useState<string>('0000-00-00')
  const [tStrs, setTstrs] = useState<string[]>(['00', '00', '00'])

  useEffect(() => {
    setDstr(toDateStr(time))
    setTstrs(timeStr(time))
  }, [+time])

  return { dateStr, tStrs }
}

function ClockTool() {
  const { mode, setMode, config, setConfig } = useConfig<ClockConfig>('clock', {
    dateVisible: true,
    bgColor: '#aaaaff',
    fontColor: '#000066',
  })
  const { dateStr, tStrs } = useTimeStr()
  const [touched, setTouched] = useState<boolean>(false)

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
    >
      <ClockAtom config={config} dateStr={dateStr} tStrs={tStrs} />

      <ConfigModal
        mode={mode}
        background="transparent"
        onLeave={() => {
          if (touched) return
          setMode('main')
        }}
      >
        <div
          className="over"
          style={{
            height: 'max-contnt',
            width: 'max-content',
            padding: '4px',
            background: '#ffffffaa',
          }}
          onMouseDown={() => setTouched(true)}
        >
          <ColorField
            label="Back"
            onChange={(bgColor) => setConfig((v) => ({ ...v, bgColor }))}
            value={config.bgColor}
          />
          <ColorField
            label="Font"
            onChange={(fontColor) => setConfig((v) => ({ ...v, fontColor }))}
            value={config.fontColor}
          />
          <IconButton
            onClick={() => {
              setMode('main')
              setTouched(false)
            }}
          >
            <Close />
          </IconButton>
        </div>
      </ConfigModal>
    </div>
  )
}

export default ClockTool
