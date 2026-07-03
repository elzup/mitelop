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
  const layout = config.layout ?? 'stack'
  // 「時刻のみ大」レイアウトは日付を出さない
  const showDate = config.dateVisible && layout !== 'time'

  const time = (
    <div className="time">
      {hs}
      <span>:</span>
      {ms}
      <span>:</span>
      {ss}
    </div>
  )
  const date = showDate ? <div className="date">{dateStr}</div> : null

  return (
    <SizeDef portRate={1.8}>
      <Style
        data-layout={layout}
        style={{
          // @ts-ignore
          '--bg-color': config.bgColor,
          '--font-color': config.fontColor,
        }}
      >
        <div className="outer">
          <div className="inner">
            {date}
            {time}
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
  background: var(--bg-color);
  box-sizing: border-box;

  .outer {
    color: var(--font-color);
    display: grid;
    height: 100%;
    place-items: center;
  }
  .inner {
    text-align: center;
    max-width: var(--w);
  }
  .time {
    font-size: calc(var(--w) * 0.24);
    line-height: 1.1;
  }
  .date {
    font-size: calc(var(--w) * 0.1);
    margin-bottom: -4%;
    text-align: left;
  }

  /* 日付+時刻 (既定): 中央に縦積み。上の date は現状踏襲 */
  &[data-layout='stack'] .inner {
    text-align: center;
  }

  /* 時刻のみ大: 枠いっぱいに大きく */
  &[data-layout='time'] .time {
    font-size: calc(var(--w) * 0.32);
  }

  /* 横並び: 時刻を大きく、日付を右にインラインで添える */
  &[data-layout='row'] .inner {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 4%;
  }
  &[data-layout='row'] .time {
    font-size: calc(var(--w) * 0.16);
  }
  &[data-layout='row'] .date {
    margin-bottom: 0;
    font-size: calc(var(--w) * 0.06);
  }
`

export default ClockAtom
