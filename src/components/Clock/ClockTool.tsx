import { ClockConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { useThemeColor } from '../hooks/useDocumentMeta'
import { OpenConfigButton } from '../OpenConfigButton'
import ClockAtom from './ClockAtom'
import { clockDefaultConfig } from './clockConfig'
import { useClockTime } from './useClockTime'

type Props = {
  windowMode?: boolean
}
function ClockTool({ windowMode }: Props) {
  const { config, mode, setMode } = useActiveSlot<ClockConfig>(
    'gad-clock',
    clockDefaultConfig,
    'clock'
  )

  const { dateStr, tStrs } = useClockTime(config.diffMinutes)

  useThemeColor(windowMode ? config.bgColor : undefined)

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <ClockAtom config={config} dateStr={dateStr} tStrs={tStrs} />

      <ConfigModal mode={mode} miniOver>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-clock" />
        </div>
      </ConfigModal>
    </div>
  )
}

export default ClockTool
