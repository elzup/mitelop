import React from 'react'
import styled from 'styled-components'
import { ClockConfig } from '../../types'
import { useAppTheme } from '../hooks/useAppTheme'
import SizeDef from '../SizeDef'

type Props = {
  config: ClockConfig
  dateStr: string
  tStrs: string[]
}

function ClockAtom(props: React.PropsWithChildren<Props>) {
  const { config, dateStr } = props
  const { resolve } = useAppTheme()
  const [hs, ms, ss] = props.tStrs
  const layout = config.layout ?? 'stack'
  // 「時刻のみ大」レイアウトは日付を出さない
  const showDate = config.dateVisible && layout !== 'time'

  return (
    <SizeDef portRate={1.8}>
      <Style
        data-layout={layout}
        style={{
          // @ts-ignore
          '--bg-color': resolve(config.bgColor),
          '--font-color': resolve(config.fontColor),
        }}
      >
        <div className="inner">
          {showDate && <div className="date">{dateStr}</div>}
          <div className="time">
            {hs}
            <span>:</span>
            {ms}
            <span>:</span>
            {ss}
          </div>
        </div>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2% 3%;
  font-family: 'Roboto';
  background: var(--bg-color);
  color: var(--font-color);
  display: grid;
  place-items: center;

  .inner {
    max-width: 100%;
    text-align: center;
  }
  .time {
    font-size: calc(var(--w) * 0.22);
    line-height: 1.05;
    white-space: nowrap;
  }
  .time span {
    margin: 0 0.02em;
  }
  .date {
    font-size: calc(var(--w) * 0.09);
    white-space: nowrap;
  }

  /* 日付+時刻 (既定): 日付を上に、時刻を下に中央寄せ */
  &[data-layout='stack'] .date {
    margin-bottom: 2%;
  }

  /* 時刻のみ大: 幅いっぱいまで大きく */
  &[data-layout='time'] .time {
    font-size: calc(var(--w) * 0.24);
  }

  /* 横並び: 時刻の右に日付を小さく添える (横長向き) */
  &[data-layout='row'] .inner {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.4em;
  }
  &[data-layout='row'] .time {
    font-size: calc(var(--w) * 0.15);
  }
  &[data-layout='row'] .date {
    margin-bottom: 0;
    font-size: calc(var(--w) * 0.07);
  }
`

export default ClockAtom
