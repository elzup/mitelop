import { Button, IconButton, InputBase, Paper, Slider } from '@material-ui/core'
import React from 'react'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import { MidokoroConfig, MidokoroPlot } from '../../types'

export type Props = {
  config: MidokoroConfig
  progressRate: number
  plots: MidokoroPlot[]
  onAddPlot: () => void
  onDeletePlot: (id: string) => void
  onChangePlot: (plot: MidokoroPlot) => void
}

function MidokoroAtom(props: React.PropsWithChildren<Props>) {
  const { config, plots, onDeletePlot, onAddPlot, onChangePlot } = props
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const marks = plots.map((p) => ({ value: p.rate, label: p.label }))

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
        <div className="slides">
          <Slider
            step={5}
            max={100}
            valueLabelDisplay="auto"
            marks
            value={props.progressRate}
          />
          <div className="marks-slide">
            <Slider
              max={100}
              track={false}
              valueLabelDisplay="auto"
              value={marks.map((v) => v.value)}
              marks={marks}
            />
          </div>
        </div>
        <div className="ui">
          <div>
            <Button variant="contained" onClick={onAddPlot}>
              Pin
            </Button>
          </div>
          <div className="plots-list">
            {plots.map((plot) => (
              <div key={plot.id}>
                <Paper component="form">
                  <InputBase
                    value={plot.label}
                    onChange={(e) =>
                      onChangePlot({ ...plot, label: e.target.value })
                    }
                  />
                  <IconButton
                    aria-label="directions"
                    onClick={() => onDeletePlot(plot.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div<{ bgColor: string; fontColor: string }>`
  width: 100%;
  width: 94%;
  height: 100%;
  padding: 0 3%;
  font-family: 'Roboto';
  position: relative;
  /* display: table; */

  .outer {
    .marks-slide {
      height: 28px;
    }
    display: grid;
    grid-template-rows: max-content 1fr;
    height: 100%;

    .ui {
      display: grid;
      grid-template-columns: auto auto;
    }
  }
`

export default MidokoroAtom
