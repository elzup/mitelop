import { useEffect, useState } from 'react'

const pad3 = (n: number) => `${n}`.padStart(3, '0')

// 20 fps dummy milli seconds
export function useVirtualMs(start: number) {
  const [ms, setMs] = useState<number>(start)

  useEffect(() => {
    setMs(start)
    const e = setInterval(() => {
      setMs(v => (v + 24) % 1000)
    }, 24)

    return () => clearInterval(e)
  }, [start])
  return pad3(ms)
}
