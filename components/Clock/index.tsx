import { ReactFitty } from 'react-fitty'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { useSeconds } from 'use-seconds'

const RATE = 1.8

const pad2 = (n: number) => `${n}`.padStart(2, '0')
const dateStr = (t: Date) =>
  `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`
const timeStr = (t: Date) =>
  [t.getHours(), t.getMinutes(), t.getSeconds()].map(pad2).join(':')

function Clock() {
  const [time] = useSeconds()
  const [ref, { height }] = useMeasure<HTMLDivElement>()
  const maxWidth = height * RATE

  return (
    <Style ref={ref}>
      <div className="frame" style={{ maxWidth }}>
        <div>
          <ReactFitty className="date">{dateStr(time)}</ReactFitty>
          <ReactFitty className="time">{timeStr(time)}</ReactFitty>
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  width: 96%;
  height: 100%;
  padding: 0 2%;
  font-family: 'Roboto';
  /* display: table; */
  .frame {
    display: grid;
    height: 100%;
    vertical-align: middle;
    display: grid;
    margin: 0 auto;

    place-items: center;
    /* border: solid 0.5px gray; */
    > div {
      text-align: center;
      width: 100%;

      .date {
        /* width: 50%; */
        text-align: left;
      }
    }
  }
`

export default Clock
