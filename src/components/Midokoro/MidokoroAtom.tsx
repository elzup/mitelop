import { Button, Slider } from '@material-ui/core'
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
  const { config, plots, onDeletePlot, onAddPlot } = props
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const marks = plots.map((p) => ({ value: p.rate, label: 'note' }))

  return (
    <Style
      ref={ref}
      style={{
        // @ts-ignore
        '--w': `${width}px`,
        '--h': `${height}px`,
      }}
    >
      <div className="outer">
        <Slider
          step={5}
          max={100}
          valueLabelDisplay="auto"
          marks
          value={props.progressRate}
        />
        <Slider
          max={100}
          track={false}
          valueLabelDisplay="auto"
          value={marks.map((v) => v.value)}
          marks={marks}
        />
        <div className="ui">
          <div>
            <Button variant="contained" onClick={onAddPlot}>
              Pin
            </Button>
          </div>
          <div className="plots-list">
            <ul>
              {plots.map((plot) => (
                <li key={plot.rate}>
                  :{Math.floor((plot.rate / 100) * 60)}
                  <Button onClick={() => onDeletePlot(plot)}>❌</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
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

  .outer {
    display: grid;
    height: 100%;

    .ui {
      display: grid;
      grid-template-columns: auto auto;
    }
  }
`

export default ClockAtom
