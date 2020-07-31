import { useState, useEffect } from 'react'
import { useSeconds } from 'use-seconds'

type TimerState =
  | { status: 'init'; time: number }
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }
  | { status: 'end'; time: number }

type TimerStatus = 'run' | 'pause' | 'init' | 'end'
type UseTimer = {
  status: TimerStatus
  start: (time?: number) => void
  setTime: (time: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
  time: number
  floorTime: number
}

const initialTimer: TimerState = {
  status: 'init',
  time: 0,
}

function calcTime(
  sw: TimerState,
  total: number,
  now: number
): [number, number] {
  let time = 0

  if (sw.status === 'run') {
    time = total - Math.max(0, +now - sw.startTime)
  } else {
    time = total - sw.time
  }
  return [time, Math.max(0, time - 1000)]
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

  const [time, floorTime] = calcTime(sw, total, +now)

  useEffect(() => {
    if (time > 0 || sw.status === 'init') return
    setTimer({
      status: 'end',
      time: total,
    })
  }, [time])

  return {
    status: sw.status,
    floorTime,
    setTime: setTotal,
    start: (time?: number) => {
      if (time !== undefined) {
        setTotal(time)
      }
      startRun(0)
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
