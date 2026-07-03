import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useState } from 'react'
import { ClockConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import { useThemeColor } from '../hooks/useDocumentMeta'
import ClockAtom from './ClockAtom'
import ClockConfigEditor from './ClockConfigEditor'
import { clockDefaultConfig } from './clockConfig'
import { useClockTime } from './useClockTime'

type Props = {
  windowMode?: boolean
}
function ClockTool({ windowMode }: Props) {
  const { mode, setMode, config, setConfig } = useConfig<ClockConfig>(
    'clock',
    clockDefaultConfig
  )

  const { dateStr, tStrs } = useClockTime(config.diffMinutes)
  const [touched, setTouched] = useState<boolean>(false)

  useThemeColor(windowMode ? config.bgColor : undefined)

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => {
        if (touched) return
        setMode('main')
      }}
    >
      <ClockAtom config={config} dateStr={dateStr} tStrs={tStrs} />

      <ConfigModal mode={mode} miniOver>
        <div className="over" onMouseDown={() => setTouched(true)}>
          <ClockConfigEditor config={config} setConfig={setConfig} />
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
