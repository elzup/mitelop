import React from 'react'
import styled from 'styled-components'
import { GadgetMode } from '../types'

export const Style = styled.div`
  &[data-mode='main'] {
    display: none;
  }
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 4px;

  .conf,
  .over {
    display: none;
  }

  &[data-mode='over'] {
    .over {
      display: block;
    }
  }
  &[data-mode='conf'] {
    .conf {
      display: block;
    }
    background: white !important;
  }
`

export const ConfigModal: React.FC<{
  mode: GadgetMode
  onLeave?: () => void
  background?: string
}> = (props) => (
  <Style
    data-mode={props.mode}
    style={{
      background: props.background,
    }}
    onMouseLeave={props.onLeave}
  >
    {props.children}
  </Style>
)

ConfigModal.defaultProps = { background: '#ffffffcc' }
