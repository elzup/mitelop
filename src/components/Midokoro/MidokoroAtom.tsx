import {
  Button,
  IconButton,
  InputBase,
  Paper,
  Slider,
  TextField,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { MidokoroConfig, MidokoroPlot } from '../../types'
import SizeDef from '../SizeDef'

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
    <SizeDef>
      <Style>
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
                <div className="plot-form-item" key={plot.id}>
                  <TextField
                    variant="outlined"
                    value={plot.label}
                    size="small"
                    onChange={(e) =>
                      onChangePlot({ ...plot, label: e.target.value })
                    }
                  />
                  <IconButton
                    aria-label="directions"
                    size="small"
                    onClick={() => onDeletePlot(plot.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  width: 100%;
  width: 94%;
  height: 100%;
  padding: 0 3%;
  font-family: 'Roboto';
  position: relative;
  /* display: table; */

  .slides {
    padding-bottom: 1rem;
  }

  .outer {
    .marks-slide {
      height: 28px;
    }
    display: grid;
    grid-template-rows: max-content 1fr;
    height: 100%;

    .ui {
      padding: 4px;
      display: grid;
      grid-template-columns: auto auto;
      .plot-form-item {
        display: flex;
        justify-content: space-between;
        padding: 4px;
      }
    }
  }
`

export default MidokoroAtom
