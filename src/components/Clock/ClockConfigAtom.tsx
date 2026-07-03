import { Dispatch, SetStateAction } from 'react'
import { ClockConfig } from '../../types'
import ClockAtom from './ClockAtom'
import { useClockTime } from './useClockTime'

type Props = {
  config: ClockConfig
  setConfig: Dispatch<SetStateAction<ClockConfig>>
}

/** 時刻は runtime 派生なので Atom 側で自前計算する。 */
function ClockConfigAtom({ config }: Props) {
  const { dateStr, tStrs } = useClockTime(config.timeZone)

  return <ClockAtom config={config} dateStr={dateStr} tStrs={tStrs} />
}

export default ClockConfigAtom
