import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ClearIcon from '@material-ui/icons/Clear'
import * as React from 'react'
import styled from 'styled-components'
import SizeDef from '../SizeDef'
import { useCounter } from '../hooks/useCounter'

function CounterTool() {
  const { count, add, sub, reset } = useCounter()

  return (
    <SizeDef portRate={1.6} landRate={2}>
      <Style>
        <div className="count">{count}</div>
        <div className="controls">
          <IconButton onClick={add}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={sub} disabled={count === 0}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={reset} disabled={count === 0}>
            <ClearIcon />
          </IconButton>
        </div>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;

  .count {
    font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif;
    font-size: calc(var(--w) * 0.2);
    display: grid;
    place-items: center;
  }

  .controls {
    display: flex;
    justify-content: center;

    .MuiSvgIcon-root {
      font-size: calc(var(--w) * 0.15);
    }
  }
`

export default CounterTool
