import React from 'react'
import styled from 'styled-components'
import { ClockConfig } from '../../types'
import SizeDef from '../SizeDef'

type Props = {
  config: ClockConfig
  dateStr: string
  tStrs: string[]
}
function ClockAtom(props: React.PropsWithChildren<Props>) {
  const { config, dateStr } = props
  const [hs, ms, ss] = props.tStrs

  return (
    <SizeDef portRate={1.8}>
      <Style
        date-visible={config.dateVisible}
        style={{
          // @ts-ignore
          '--bg-color': config.bgColor,
          '--font-color': config.fontColor,
        }}
      >
        <div className="outer">
          <div className="inner">
            <div className="date">{dateStr}</div>
            <div className="time">
              {hs}
              <span>:</span>
              {ms}
              <span>:</span>
              {ss}
            </div>
          </div>
        </div>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 3%;
  font-family: 'Roboto';
  position: relative;
  /* display: table; */
  background: var(--bg-color);
  box-sizing: border-box;

  .outer {
    color: var(--font-color);
    display: grid;
    height: 100%;
    vertical-align: middle;
    place-items: center;
    .inner {
      text-align: center;
      max-width: var(--w);
      .time {
        font-size: calc(var(--w) * 0.24);
      }
      .date {
        font-size: calc(var(--w) * 0.1);
        margin-bottom: -4%;
        text-align: left;
      }
    }
  }
`

export default ClockAtom
