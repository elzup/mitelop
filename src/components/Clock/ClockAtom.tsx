import React from 'react'
import { useMeasure } from 'react-use'
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
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [hs, ms, ss] = props.tStrs

  const RATE = 1.8
  const maxWidth = height * RATE

  console.log('render')

  return (
    <SizeDef>
      <Style
        // @ts-ignore
        ref={ref}
        // @ts-ignore
        style={{ '--w': `${Math.min(width, maxWidth)}px` }}
        bgColor={config.bgColor}
        fontColor={config.fontColor}
        date-visible={config.dateVisible}
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

const Style = styled.div<{ bgColor: string; fontColor: string }>`
  width: 100%;
  height: 100%;
  padding: 0 3%;
  font-family: 'Roboto';
  position: relative;
  /* display: table; */
  background: var(--bg-color);

  .outer {
    color: var(--font-color);
    display: grid;
    height: 100%;
    vertical-align: middle;
    place-items: center;
    .inner {
      text-align: center;
      width: 100%;
      max-width: var(--w);
      .time {
        font-size: calc(var(--w) * 0.25);
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
