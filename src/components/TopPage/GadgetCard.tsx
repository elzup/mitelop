import { Button, Icon, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'

const Style = styled.div`
  width: 300px;
  height: 200px;
  display: grid;
  grid-template-rows: auto 1fr;
  border: solid 1px #2b0065;
  border-radius: 4px;
  padding: 8px;
  margin: 8px;
  overflow: hidden;
`

type Props = { icon: string; title: string; path: string }

const GadgetCard: React.FC<Props> = ({ icon, title, children, path }) => {
  const size = { width: 400, height: 300 }

  return (
    <Style>
      <div style={{ display: 'flex' }}>
        <Icon>{icon}</Icon>
        <Typography>{title}</Typography>
        <Button
          onClick={() => {
            windowOpen(path, {
              name: isDev ? 'replace' : '_blank',
              ...size,
            })
          }}
        >
          開く
        </Button>
      </div>
      <div>{children}</div>
    </Style>
  )
}

export default GadgetCard
