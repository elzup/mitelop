/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styled from 'styled-components'
import { ParrotConfig } from '../../types'
import { useSpeech } from '../hooks/useSpeech'
import SizeDef from '../SizeDef'

type Props = {
  config: ParrotConfig
}
function ParrotAtom({ config }: Props) {
  const { pitch, rate } = config
  const { speechStart, speechStop, isStart, text } = useSpeech(pitch, rate)

  return (
    <SizeDef>
      <Style>
        <button
          className="start-button"
          disabled={isStart}
          onClick={speechStart}
        >
          Start
        </button>
        <button
          className="stop-button"
          disabled={!isStart}
          onClick={speechStop}
        >
          Stop
        </button>
        <h3>{text}</h3>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 2fr;
  grid-template-areas:
    'ctlr ctls'
    'btns btnp'
    'text text';
  button {
    font-size: calc(var(--w) / 10);
    &[disabled] {
      opacity: 0.1;
    }
  }
  .start-button {
    grid-area: 'btns';
  }
  .stop-button {
    grid-area: 'btnp';
  }
  h3 {
    grid-area: 'text';
  }
`

export default ParrotAtom
