import React from 'react'
import styled from 'styled-components'

export const ConfigModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
`

export const ConfigModal: React.FC<{ onClose: () => void }> = (props) => (
  <ConfigModalStyle onMouseLeave={props.onClose}>
    {props.children}
  </ConfigModalStyle>
)
