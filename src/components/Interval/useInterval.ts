import { useState, useEffect } from 'react'
import { useSeconds } from 'use-seconds'
import { IntervalStep, IntervalStepBase } from '../../types'

export type IntervalStatus = 'stop' | 'run'

type UseInterval = {
  status: IntervalStatus
  start: (time?: number) => void
  pause: () => void
  reset: () => void
  startTime: number
  steps: IntervalStep[]
  progress: number
}

export function useInterval(steps: IntervalStepBase[]): UseInterval {
  const [status, setStatus] = useState<IntervalStatus>('run')
  const [diff, setDiff] = useState<number>(0)
  const [now] = useSeconds(diff)

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setStatus('run')
  }
  const total = steps.reduce((acc, step) => acc + step.sec, 0)

  const pos = Math.floor(+now / 1000) % total
  const progress = pos / total

  const sums: number[] = []

  steps.reduce((c, step) => {
    sums.push(c)
    return c + step.sec
  }, 0)

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
    steps: steps.map((step, i) => {
      const start = sums[i]
      const end = start + step.sec

      return {
        ...step,
        active: start <= pos && pos < end,
        par: (pos - start) / (step.sec - 1),
      }
    }),
    startTime: 0,
  }
}
