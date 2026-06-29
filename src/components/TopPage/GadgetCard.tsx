import { Icon, IconButton, Typography } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { isDev } from '@elzup/kit/lib/constants'
import { windowOpen } from '../../utils/browser'

type Props = {
  children: ReactNode
  icon: string
  title: string
  path: string
}

const GadgetCard = ({ icon, title, children, path }: Props) => {
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
