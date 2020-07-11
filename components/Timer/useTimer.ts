import { useState } from 'react'
import { useSeconds } from 'use-seconds'

type TimerState =
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }

type UseTimer = {
  status: 'run' | 'pause' | 'end'
  pause: () => void
  run: () => void
  reset: () => void
  time: number
}

export function useTimer(): UseTimer {
  const [sw, setTimer] = useState<TimerState>({
    status: 'pause',
    time: 0,
  })
  const [diff, setDiff] = useState<number>(0)
  const [now] = useSeconds(diff)

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setTimer({ status: 'run', startTime })
  }

  const time =
    sw.status === 'pause' ? sw.time : Math.max(0, +now - sw.startTime)

  return {
    status: sw.status,
    pause: () => {
      if (sw.status === 'pause') return
      setTimer({ status: 'pause', time: +new Date() - sw.startTime })
    },
    run: () => {
      if (sw.status === 'run') return
      startRun(-sw.time)
    },
    reset: () => {
      setTimer({ status: 'pause', time: 0 })
    },
    time,
  }
}
