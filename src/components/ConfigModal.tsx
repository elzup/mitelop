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
  box-sizing: border-box;
  background: #ffffffcc;
  padding: 4px;
  overflow: scroll;

  .conf,
  .over {
    display: none;
  }

  &[data-mode='over'] {
    .over {
      display: block;
    }
    &[data-mini_over='true'] {
      background: transparent;
      .over {
        padding: 4px;
        background: #bbbbbbf7;
        height: max-content;
        width: max-content;
        position: absolute;
        right: 0;
        top: 0;
      }
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
  miniOver?: boolean
}> = (props) => (
  <Style
    data-mode={props.mode}
    data-mini_over={props.miniOver}
    onMouseLeave={props.onLeave}
  >
    {props.children}
  </Style>
)

ConfigModal.defaultProps = { miniOver: false }
