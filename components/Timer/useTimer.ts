import { useState, useEffect } from 'react'
import { useSeconds } from 'use-seconds'

type TimerState =
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }

type UseTimer = {
  status: 'run' | 'pause'
  start: (time: number) => void
  pause: () => void
  run: () => void
  time: number
}

const initialTimer: TimerState = {
  status: 'pause',
  time: 0,
}

export function useTimer(): UseTimer {
  const [sw, setTimer] = useState<TimerState>(initialTimer)
  const [diff, setDiff] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [now] = useSeconds(diff)

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setTimer({ status: 'run', startTime })
  }

  const time =
    total - (sw.status === 'pause' ? sw.time : Math.max(0, +now - sw.startTime))

  useEffect(() => {
    if (time <= 0) {
      setTimer({
        status: 'pause',
        time: total,
      })
    }
  }, [time])

  return {
    status: sw.status,
    start: (time: number) => {
      startRun(0)
      setTotal(time)
    },
    pause: () => {
      if (sw.status === 'pause') return
      setTimer({ status: 'pause', time: +new Date() - sw.startTime })
    },
    run: () => {
      if (sw.status === 'run') return
      startRun(-sw.time)
    },
    time,
  }
}
