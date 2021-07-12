import { useState } from 'react'
import { useSeconds } from 'use-seconds'

type StopwatchState =
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }

type UseStopwatch = {
  status: 'run' | 'pause'
  startTime: number
  pause: () => void
  run: () => void
  reset: () => void
  time: number
}

export function useStopwatch(): UseStopwatch {
  const [sw, setStopwatch] = useState<StopwatchState>({
    status: 'pause',
    time: 0,
  })
  const [diff, setDiff] = useState<number>(0)
  const [now] = useSeconds(diff)

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setStopwatch({ status: 'run', startTime })
  }

  const time =
    sw.status === 'pause' ? sw.time : Math.max(0, +now - sw.startTime)

  return {
    status: sw.status,
    startTime: sw.status === 'run' ? sw.startTime : 0,
    pause: () => {
      if (sw.status === 'pause') return
      setStopwatch({ status: 'pause', time: +new Date() - sw.startTime })
    },
    run: () => {
      if (sw.status === 'run') return
      startRun(-sw.time)
    },
    reset: () => {
      setStopwatch({ status: 'pause', time: 0 })
    },
    time,
  }
}
