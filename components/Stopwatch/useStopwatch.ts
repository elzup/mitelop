import { useState } from 'react'

type Stopwatch =
  | { status: 'init' }
  | { status: 'run'; startTime: number }
  | { status: 'pause'; time: number }

export function useStopwatch() {
  const [stopwatch, setStopwatch] = useState<Stopwatch>({ status: 'init' })
  const [time, setTime] = useState<number>(0)

  const startRun = (offset = 0) => {
    const startTime = +new Date() - offset

    setStopwatch({ status: 'run', startTime })
  }

  switch (stopwatch.status) {
    case 'init':
      return [
        stopwatch.status,
        {
          setStart: () => startRun(),
        },
      ] as const
    case 'run':
      return [
        status,
        {
          setPause: () => {
            setStopwatch({ status: 'pause', time: +new Date() })
          },
        },
      ] as const
    case 'pause':
      return [
        stopwatch.status,
        {
          setResume: () => startRun(-stopwatch.time),
        },
      ] as const
    default:
      throw new Error('broken stopwatch')
  }
}
