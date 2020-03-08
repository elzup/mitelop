import styled from 'styled-components'
import { useSeconds } from 'use-seconds'

const dateStr = (t: Date) =>
  `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`
const timeStr = (t: Date) =>
  `${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}`

function Clock() {
  const [time] = useSeconds()

  return (
    <Style>
      <span>{dateStr(time)}</span>
      <span>{timeStr(time)}</span>
    </Style>
  )
}

const Style = styled.div`
  display: grid;
`

export default Clock
