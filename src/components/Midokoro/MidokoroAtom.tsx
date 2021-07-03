import React from 'react'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { MidokoroConfig, MidokoroPlot } from '../../types'

export type Props = {
  config: MidokoroConfig
  progressRate: number
  plots: MidokoroPlot[]
  onAddPlot: () => void
  onDeletePlot: (plot: MidokoroPlot) => void
}

function ClockAtom(props: React.PropsWithChildren<Props>) {
  const { config, plots } = props
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return (
    <Style
      ref={ref}
      style={{
        // @ts-ignore
        '--w': `${width}px`,
        '--h': `${height}px`,
      }}
    >
      <div className="outer">Hello</div>
    </Style>
  )
}

const Style = styled.div<{ bgColor: string; fontColor: string }>`
  width: 94%;
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
