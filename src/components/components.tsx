import React from 'react'
import styled from 'styled-components'

export const ConfigModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 4px;
  background: white;
`

export const ConfigModal: React.FC<{ onClose: () => void }> = (props) => (
  <ConfigModalStyle onMouseLeave={props.onClose}>
    {props.children}
  </ConfigModalStyle>
)
