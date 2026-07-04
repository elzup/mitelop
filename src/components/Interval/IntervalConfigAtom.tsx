import { Dispatch, SetStateAction } from 'react'
import { IntervalConfig } from '../../types'
import { timeToStr } from '../hooks/useTimeStr'
import IntervalAtom from './IntervalAtom'
import { useInterval } from './useInterval'

type Props = {
  config: IntervalConfig
  setConfig: Dispatch<SetStateAction<IntervalConfig>>
}

/** インターバルの進行 (transport) は runtime なので Atom 側に持つ (表示のみ)。 */
function IntervalConfigAtom({ config }: Props) {
  const steps = config.steps.filter((v) => v.name !== '')
  const int = useInterval(steps)
  const ts = timeToStr(int.startTime)

  return (
    <IntervalAtom
      timeStr={ts[0]}
      timeMiliStr={ts[1]}
      steps={int.steps}
      status={int.status}
      layout={config.layout}
    />
  )
}

export default IntervalConfigAtom
