import { useState, useEffect } from 'react'
import { useSeconds } from 'use-seconds'

type IntervalState =
  | { status: 'init'; time: number }
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }
  | { status: 'end'; time: number }

export type IntervalStatus = 'run' | 'pause' | 'init' | 'end'
type UseInterval = {
  status: IntervalStatus
  start: (time?: number) => void
  setTime: (time: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
  time: number
  startTime: number
  flootTime: number
  progress: number
}

const initialInterval: IntervalState = {
  status: 'init',
  time: 0,
}

function calcTime(
  sw: IntervalState,
  total: number,
  now: number
): [number, number] {
  if (sw.status === 'run') {
    const time = total - Math.max(0, +now - sw.startTime)

    return [time, Math.max(0, time - 1000)]
  } else {
    const time = total - sw.time

    return [time, time]
  }
}

export function useInterval(): UseInterval {
  const [sw, setInterval] = useState<IntervalState>(initialInterval)
  const [diff, setDiff] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [now] = useSeconds(diff)

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setInterval({ status: 'run', startTime })
  }

  const [time, flootTime] = calcTime(sw, total, +now)

  useEffect(() => {
    if (time > 0 || sw.status === 'init') return
    setInterval({
      status: 'end',
      time: total,
    })
  }, [time])

  const progress = (1 - flootTime / total) * 100

  return {
    status: sw.status,
    flootTime: flootTime,
    progress,
    setTime: setTotal,
    startTime: sw.status === 'run' ? sw.startTime : 0,
    start: (time?: number) => {
      if (time !== undefined) {
        setTotal(time)
      }
      startRun(0)
    },
    pause: () => {
      if (sw.status !== 'run') return
      setInterval({ status: 'pause', time: +new Date() - sw.startTime })
    },
    resume: () => {
      if (sw.status !== 'pause') return
      startRun(-sw.time)
    },
    reset: () => {
      setInterval({
        status: 'init',
        time: 0,
      })
    },
    time,
  }
}
