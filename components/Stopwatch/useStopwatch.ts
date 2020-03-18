import { useState } from 'react'
import { useSeconds } from 'use-seconds'

type StopwatchState =
  | { status: 'init' }
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }

type UseStopwatch =
  | { status: 'init'; actions: { setStart: () => void }; time: 0 }
  | { status: 'run'; actions: { setPause: () => void }; time: number }
  | {
      status: 'pause'
      actions: { setResume: () => void; setReset: () => void }
      time: number
    }

export function useStopwatch(): UseStopwatch {
  const [sw, setStopwatch] = useState<StopwatchState>({ status: 'init' })
  const [diff, setDiff] = useState<number>(0)
  const [now] = useSeconds(diff)

  const startRun = (offset = 0) => {
    const startTime = +new Date() + offset

    setDiff(startTime % 1000)
    setStopwatch({ status: 'run', startTime })
  }

  switch (sw.status) {
    case 'init':
      return {
        status: sw.status,
        actions: {
          setStart: () => startRun(),
        },
        time: 0,
      }
    case 'run': {
      return {
        status: sw.status,
        actions: {
          setPause: () => {
            setStopwatch({ status: 'pause', time: +new Date() - sw.startTime })
          },
        },
        time: +now - sw.startTime,
      }
    }
    case 'pause': {
      return {
        status: sw.status,
        actions: {
          setResume: () => startRun(-sw.time),
          setReset: () => setStopwatch({ status: 'init' }),
        },
        time: sw.time,
      }
    }
    default:
      throw new Error('broken stopwatch')
  }
}
