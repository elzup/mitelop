import React from 'react'
import styled from 'styled-components'
import { ClockConfig } from '../../types'
import { useFitty } from '../hooks/useFitty'

type Props = {
  config: ClockConfig
  dateStr: string
  tStrs: string[]
  maxWidth: number
}
function ClockAtom(props: React.PropsWithChildren<Props>) {
  const { config, maxWidth, dateStr } = props
  const [hs, ms, ss] = props.tStrs
  const [ymdRef] = useFitty()
  const [hmdRef] = useFitty()

  return (
    <Style bgColor={config.bgColor} fontColor={config.fontColor}>
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

export default ClockAtom
