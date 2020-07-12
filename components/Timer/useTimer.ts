import { useState, useEffect } from 'react'
import { useSeconds } from 'use-seconds'

type TimerState =
  | { status: 'init'; time: number }
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }
  | { status: 'end'; time: number }

type UseTimer = {
  status: 'run' | 'pause' | 'init' | 'end'
  start: (time: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
  time: number
}

const initialTimer: TimerState = {
  status: 'init',
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
    total - (sw.status !== 'run' ? sw.time : Math.max(0, +now - sw.startTime))

  useEffect(() => {
    if (time > 0 || sw.status === 'init') return
    setTimer({
      status: 'end',
      time: total,
    })
  }, [time])

  return {
    status: sw.status,
    start: (time: number) => {
      startRun(0)
      setTotal(time)
    },
    pause: () => {
      if (sw.status !== 'run') return
      setTimer({ status: 'pause', time: +new Date() - sw.startTime })
    },
    resume: () => {
      if (sw.status !== 'pause') return
      startRun(-sw.time)
    },
    reset: () => {
      setTimer({
        status: 'init',
        time: total,
      })
    },
    time,
  }
}
