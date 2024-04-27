import { useState, useEffect } from 'react'
import { useSeconds } from 'use-seconds'

type IntervalGen = { name: string; len: number }
export type IntervalStatus = 'stop' | 'run'
type UseInterval = {
  status: IntervalStatus
  start: (time?: number) => void
  pause: () => void
  reset: () => void
  time: number
  startTime: number
  flootTime: number
  progress: number
  gens: IntervalGen[]
}

const initialInterval: IntervalState = {
  status: 'run',
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
  const [status, setStatus] = useState<IntervalStatus>('run')
  const [diff, setDiff] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [now] = useSeconds(diff)

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setStatus({ status: 'run', startTime })
  }

  const [time, flootTime] = calcTime(status, total, +now)

  useEffect(() => {
    if (time > 0 || status.status === 'init') return
    setStatus({
      status: 'end',
      time: total,
    })
  }, [time])

  const progress = (1 - flootTime / total) * 100

  return {
    status: status.status,
    flootTime: flootTime,
    progress,
    setTime: setTotal,
    startTime: status.status === 'run' ? status.startTime : 0,
    start: (time?: number) => {
      if (time !== undefined) {
        setTotal(time)
      }
      startRun(0)
    },
    pause: () => {
      if (status.status !== 'run') return
      setStatus({ status: 'pause', time: +new Date() - status.startTime })
    },
    resume: () => {
      if (status.status !== 'pause') return
      startRun(-status.time)
    },
    reset: () => {
      setStatus({
        status: 'init',
        time: 0,
      })
    },
    time,
  }
}
