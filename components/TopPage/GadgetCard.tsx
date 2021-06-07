import { Icon, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const Style = styled.div`
  width: 300px;
  height: 200px;
  display: grid;
  grid-template-rows: auto 1fr;
  border: solid 1px #2b0065;
  border-radius: 4px;
  padding: 8px;
  margin: 8px;
`

type Props = { icon: string; title: string }

const GadgetCard: React.FC<Props> = ({ icon, title, children }) => {
  return (
    <Style>
      <div style={{ display: 'flex' }}>
        <Icon>{icon}</Icon>
        <Typography>{title}</Typography>
      </div>
      <div>{children}</div>
    </Style>
  )
}

export default GadgetCard
