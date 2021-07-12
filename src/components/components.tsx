import React from 'react'
import styled from 'styled-components'

export const ConfigModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 4px;
`

export const ConfigModal: React.FC<{
  visible: boolean
  onLeave?: () => void
  background?: string
}> = (props) => (
  <ConfigModalStyle
    style={{
      display: props.visible ? 'block' : 'none',
      background: props.background,
    }}
    onMouseLeave={props.onLeave}
  >
    {props.children}
  </ConfigModalStyle>
)

ConfigModal.defaultProps = { background: '#ffffffcc' }
