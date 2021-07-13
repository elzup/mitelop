import { IconButton, Slider, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/HighlightOff'
import PinIcon from '@material-ui/icons/PinDrop'
import React from 'react'
import styled from 'styled-components'
import { MidokoroConfig, MidokoroPlot } from '../../types'
import SizeDef from '../SizeDef'

export type Props = {
  config: MidokoroConfig
  progressRate: number
  prevs: { label: string; plots: MidokoroPlot[] }[]
  current: { label: string; plots: MidokoroPlot[] }
  onAddPlot: () => void
  onDeletePlot: (id: string) => void
  onChangePlot: (plot: MidokoroPlot) => void
}

function toMarks(plots: MidokoroPlot[]) {
  return plots.map((p) => ({ value: p.rate, label: p.label }))
}

function MidokoroAtom(props: Props) {
  const { prevs, current, onDeletePlot, onAddPlot, onChangePlot } = props

  return (
    <SizeDef>
      <Style>
        <Typography>Midokoro Tool</Typography>
        <div className="outer">
          <div className="slides">
            <div className="prev-slides">
              {prevs.map((prev) => (
                <div
                  key={prev.label}
                  className="slide-item"
                  data-hidden={prev.plots.length === 0}
                >
                  <span className="hour">{prev.label}</span>
                  <Slider
                    max={100}
                    track={false}
                    valueLabelDisplay="auto"
                    value={toMarks(prev.plots).map((p) => p.value)}
                    marks={toMarks(prev.plots)}
                  />
                </div>
              ))}
            </div>

            <div className="slide-item">
              <span className="hour">{current.label}</span>
              <div>
                <Slider
                  max={100}
                  valueLabelDisplay="auto"
                  color="secondary"
                  value={props.progressRate}
                />
                <Slider
                  max={100}
                  track={false}
                  color="secondary"
                  valueLabelDisplay="auto"
                  value={toMarks(current.plots).map((p) => p.value)}
                  marks={toMarks(current.plots)}
                />
              </div>
            </div>
          </div>
          <div className="ui">
            <div>
              <IconButton
                style={{ border: 'solid 1px' }}
                aria-label="directions"
                size="small"
                onClick={onAddPlot}
              >
                <PinIcon />
              </IconButton>
            </div>
            <div className="plot-list">
              {current.plots.map((plot) => (
                <div className="plot-form-item" key={plot.id}>
                  <input
                    value={plot.label}
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
  height: 100%;
  padding: 0 3%;
  font-family: 'Roboto';
  position: relative;
  /* display: table; */
  box-sizing: border-box;

  .outer {
    display: grid;
    grid-template-rows: max-content 1fr;
    height: 100%;

    .slides {
      padding-bottom: 1rem;
      .hour {
        font-size: calc(var(--w) * 0.05);
      }
      .slide-item {
        display: grid;
        grid-template-columns: 8% auto;
        &[data-hidden='true'] {
          display: none;
        }
      }
    }
    .MuiSlider-root,
    .MuiSlider-marked {
      padding: 4px 0;
    }
    .MuiSlider-marked {
      padding-top: 0px;
      margin-bottom: 4px;
    }
    .MuiSlider-markLabel {
      top: 4px;
    }
    .prev-slides {
      .MuiSlider-marked {
        padding-top: 16px;
      }
      .MuiSlider-markLabel {
        top: 20px;
      }
    }

    .ui {
      padding: 4px;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      border-top: 1px solid #e0e0e0;
    }
    .plot-list {
      display: flex;
      flex-wrap: wrap;
      overflow-y: scroll;
      height: max-content;
      gap: 2px;
    }
    .plot-form-item {
      width: 100px;
      display: flex;
      align-items: center;
      input {
        width: 80%;
        font-size: 12px;
        height: 24px;
      }
      button {
        height: 20px;
      }
      svg {
        width: 20px;
      }
    }
  }
`

export default MidokoroAtom
