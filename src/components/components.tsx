import React from 'react'
import styled from 'styled-components'

export const ConfigModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 4px;
  background: #ffffffcc;
`

export const ConfigModal: React.FC<{ visible: boolean; onClose: () => void }> =
  (props) => (
    <ConfigModalStyle
      style={{ display: props.visible ? 'block' : 'none' }}
      onMouseLeave={props.onClose}
    >
      {props.children}
    </ConfigModalStyle>
  )
