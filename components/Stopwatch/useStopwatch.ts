import { useState, useEffect } from 'react'

type StopwatchStatus = 'init' | 'run' | 'pause'

export function useStopwatch() {
  const [status, setStatus] = useState<StopwatchStatus>('init')
  const [time, setTime] = useState<number>(0)
  const [startTime, setStartTime] = useState<Date | null>(null)

  const setStart = () => {
    setStatus('run')
    setStartTime(new Date())
  }
  const setPause = () => {
    setStatus('pause')
  }
  const setReset = () => {
    setStatus('init')
    setTime(+new Date() - startTime)
    setStartTime(null)
  }

  return [status, time, setStart, setPause, setReset]
}
