import fitty from 'fitty'
import { useEffect, useRef, useState } from 'react'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { useSeconds } from 'use-seconds'
import { ConfigModal } from '../components'

const RATE = 1.8

const pad2 = (n: number) => `${n}`.padStart(2, '0')
const toDateStr = (t: Date) =>
  `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`
const timeStr = (t: Date) =>
  [t.getHours(), t.getMinutes(), t.getSeconds()].map(pad2)

function useFitty() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    fitty(ref.current)
    ref.current.addEventListener('fit', (e) => {
      console.log(e)
    })
  }, [ref.current])
  // }, [...(deps || []), ref.current])
  return [ref] as const
}

type ClockConfig = {
  dateVisible: boolean
  bgColor: string
  fontColor: string
}
const initConfig: ClockConfig = {
  dateVisible: true,
  bgColor: '#aaaaff',
  fontColor: '#000066',
}

type Props = {
  initConfig?: ClockConfig
}
function Clock() {
  const [time] = useSeconds()
  const [config, setConfig] = useState<ClockConfig>(initConfig)

  const [ref, { height }] = useMeasure<HTMLDivElement>()
  const maxWidth = height * RATE
  const [dateStr, setDstr] = useState<string>('0000-00-00')
  const [[hs, ms, ss], setTstrs] = useState<string[]>(['00', '00', '00'])
  const [mode, setMode] = useState<'main' | 'conf'>('main')

  // useEffect(() => {
  //   // setDstr('0000-00-00')
  //   // setTstrs(['00', '00', '00'])
  //   console.log('reset')
  // }, [width, height])
  useEffect(() => {
    // console.log('t change')
    console.log(time)
    setDstr(toDateStr(time) + '　　')
    setTstrs(timeStr(time))
  }, [+time])

  const [ymdRef] = useFitty()
  const [hmdRef] = useFitty()

  return (
    <Style
      ref={ref}
      bgColor={config.bgColor}
      fontColor={config.fontColor}
      onMouseOver={() => setMode('conf')}
      // onMouseOut={() => setMode('main')}
    >
      <div className="frame" style={{ maxWidth }}>
        <div>
          {config.dateVisible && (
            <div style={{ marginBottom: '-8%' }}>
              <div className="date" ref={ymdRef}>
                {dateStr}
              </div>
            </div>
          )}
          <div className="time" ref={hmdRef}>
            {hs}
            <span>:</span>
            {ms}
            <span>:</span>
            {ss}
          </div>
        </div>
      </div>
      {mode === 'conf' && <ConfigModal>Config</ConfigModal>}
    </Style>
  )
}

const Style = styled.div<{ bgColor: string; fontColor: string }>`
  --bg-color: ${(p) => p.bgColor};
  --font-color: ${(p) => p.fontColor};
  width: 96%;
  height: 100%;
  padding: 0 2%;
  font-family: 'Roboto';
  position: relative;
  /* display: table; */
  background: var(--bg-color);
  .frame {
    color: var(--font-color);
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
