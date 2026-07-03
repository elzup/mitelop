import { Dispatch, SetStateAction, useEffect } from 'react'
import { TimerConfig } from '../../types'
import { useTimeStr } from '../hooks/useTimeStr'
import TimerAtom from './TimerAtom'
import { useTargetCountdown } from './useTargetCountdown'
import { useTimer } from './useTimer'

type Props = {
  config: TimerConfig
  setConfig: Dispatch<SetStateAction<TimerConfig>>
}

/** カウントダウンの進行 (transport) は runtime なので Atom 側に持つ (表示のみ)。 */
function TimerConfigAtom({ config }: Props) {
  const isTarget = config.mode === 'target'
  const sw = useTimer()
  const target = useTargetCountdown(config.targetTime)
  const [durStr, durMs] = useTimeStr(sw.time, sw.status)
  const [tgtStr, tgtMs] = useTimeStr(target.remaining)

  useEffect(() => {
    sw.setTime(config.total)
    // total が変わったら再セットするだけ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.total])

  if (isTarget) {
    return (
      <TimerAtom
        total={1}
        timeStr={tgtStr}
        timeMilliStr={tgtMs}
        progress={0}
        startTime={0}
        status={target.active ? 'pause' : 'init'}
      />
    )
  }

  return (
    <TimerAtom
      total={config.total}
      timeStr={durStr}
      timeMilliStr={durMs}
      progress={sw.progress}
      startTime={sw.startTime}
      status={sw.status}
    />
  )
}

export default TimerConfigAtom
