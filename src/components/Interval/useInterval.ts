import { useState, useEffect } from 'react'
import { useSeconds } from 'use-seconds'
import { IntervalStep } from '../../types'

export type IntervalStatus = 'stop' | 'run'
type UseInterval = {
  status: IntervalStatus
  start: (time?: number) => void
  pause: () => void
  reset: () => void
  startTime: number
  progress: number
}

export function useInterval(steps: IntervalStep[]): UseInterval {
  const [status, setStatus] = useState<IntervalStatus>('run')
  const [diff, setDiff] = useState<number>(0)
  const [now] = useSeconds(diff)

  useEffect(() => {}, [+now])

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setStatus('run')
  }
  const total = steps.reduce((acc, step) => acc + step.sec, 0)

  const progress = total

  return {
    status,
    progress,
    start: (time?: number) => {
      if (time !== undefined) {
      }
      startRun(0)
    },
    pause: () => {
      if (status !== 'run') return
      setStatus('stop')
    },
    reset: () => {
      setStatus('stop')
    },
    startTime: 0,
  }
}
