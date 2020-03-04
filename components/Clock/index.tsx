import styled from 'styled-components'
import { useState } from 'react'

type Status = 'on' | 'off'

const useTime = () => {
  const [time] = useState<Date>(new Date())

  return time
}

function Clock() {
  const time = useTime()

  return (
    <Style>
      <div className="panel">{String(time.getSeconds())}</div>
      <div className="footer"></div>
    </Style>
  )
}

const Style = styled.div`
  display: grid;
`

export default Clock
