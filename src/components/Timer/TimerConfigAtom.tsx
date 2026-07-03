import { Dispatch, SetStateAction, useEffect } from 'react'
import { TimerConfig } from '../../types'
import { useTimeStr } from '../hooks/useTimeStr'
import TimerAtom from './TimerAtom'
import { useTimer } from './useTimer'

type Props = {
  config: TimerConfig
  setConfig: Dispatch<SetStateAction<TimerConfig>>
}

/** カウントダウンの進行 (transport) は runtime なので Atom 側に持つ (表示のみ)。 */
function TimerConfigAtom({ config }: Props) {
  const sw = useTimer()
  const [timeStr, timeMilliStr] = useTimeStr(sw.time, sw.status)

  useEffect(() => {
    sw.setTime(config.total)
    // total が変わったら再セットするだけ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.total])

  return (
    <TimerAtom
      total={config.total}
      timeStr={timeStr}
      timeMilliStr={timeMilliStr}
      progress={sw.progress}
      startTime={sw.startTime}
      status={sw.status}
    />
  )
}

export default TimerConfigAtom
