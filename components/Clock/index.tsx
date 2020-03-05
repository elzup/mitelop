import styled from 'styled-components'
import { useState, useEffect } from 'react'

const roundSeconds = (t: Date): [Date, number] => {
  const d = +t % 1000
  const nextMs = 1000 - t.getMilliseconds()

  if (d < 500) {
    return [new Date(+t - d), nextMs]
  }
  return [new Date(+t + (1000 - d)), nextMs + 1000]
}

const useTime = () => {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    let handle: number | null = null

    const secondsCycle = () => {
      const t = new Date()
      const [fixedTime, nextMs] = roundSeconds(t)

      handle = setTimeout(secondsCycle, Math.max(nextMs - 1, 1))

      setTime(fixedTime)
    }

    secondsCycle()
    return () => {
      if (handle) {
        clearTimeout(handle)
      }
    }
  }, [])

  return time
}

function Clock() {
  const time = useTime()

  return (
    <Style>
      <div className="panel">{String(time.getSeconds())}</div>
      <div className="footer">{+time}</div>
      <div className="footer">{String(time)}</div>
    </Style>
  )
}

const Style = styled.div`
  display: grid;
`

export default Clock
