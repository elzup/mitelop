import React, { useEffect, useState } from 'react'

const mod = (a: number, b: number) => ((a % b) + b) % b

export const DummyMs = ({ ms: start, inv }: { ms: number; inv: boolean }) => {
  const calc = () => mod((+new Date() - start) * (inv ? -1 : 1), 1000)
  const [ms, setMs] = useState<number>(calc())

  useEffect(() => {
    console.log(start)
    const t = setInterval(() => {
      setMs(calc())
    }, 40)

    return () => clearInterval(t)
  }, [])
  return <>{`${Math.floor(ms / 10)}`.padStart(2, '0') + ' '}</>
}
DummyMs.defaultProps = {
  inv: false,
}
