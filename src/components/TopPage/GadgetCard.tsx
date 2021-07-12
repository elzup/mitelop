import { Icon, IconButton, Typography } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import React from 'react'
import styled from 'styled-components'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'

type Props = { icon: string; title: string; path: string }

const GadgetCard: React.FC<Props> = ({ icon, title, children, path }) => {
  const size = { width: 400, height: 300 }

  return (
    <Style>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
        <div style={{ display: 'flex' }}>
          <Icon>{icon}</Icon>
          <Typography>{title}</Typography>
        </div>
        <IconButton
          size="small"
          onClick={() => {
            windowOpen(path, {
              name: isDev ? 'replace' : '_blank',
              ...size,
            })
          }}
        >
          <LaunchIcon />
        </IconButton>
      </div>
      <Frame>{children}</Frame>
    </Style>
  )
}

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
const Frame = styled.div`
  border: solid 1px #2b0065;
  border-radius: 4px;
  overflow: hidden;
`

export default GadgetCard
