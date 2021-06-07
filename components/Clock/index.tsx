import styled from 'styled-components'
import { useSeconds } from 'use-seconds'

const pad2 = (n: number) => `${n}`.padStart(2, '0')
const dateStr = (t: Date) =>
  `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`
const timeStr = (t: Date) =>
  [t.getHours(), t.getMinutes(), t.getSeconds()].map(pad2).join(':')

function Clock() {
  const [time] = useSeconds()

  return (
    <Style>
      <div />
      <div className="frame">
        <span className="date">{dateStr(time)}</span>
        <span className="time">{timeStr(time)}</span>
      </div>
      <div />
    </Style>
  )
}

const Style = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content 1fr;
  .frame {
    display: grid;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
    span {
      text-align: center;
      font-size: calc(100% / 5);
      line-height: 1.05em;

      &.date {
        text-align: unset;
        font-size: calc(100% / 5 / 3);
      }
    }
  }
`

export default Clock
