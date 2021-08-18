import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import styled from 'styled-components'
import { GITHUB_LINK } from '../../config'
import GadgetList from './GadgetList'

const StyledAppBar = styled(AppBar)`
  @media (display-mode: standalone) {
    display: none !important;
  }
`

const TopPage = () => {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar variant="dense">
          <Typography>Mitelop</Typography>
          <div style={{ flexGrow: 1 }} />
          <div>
            <IconButton color="inherit">
              <a style={{ color: 'inherit' }} href={GITHUB_LINK}>
                <GitHubIcon />
              </a>
            </IconButton>
          </div>
        </Toolbar>
      </StyledAppBar>
      <div style={{ margin: '8px' }}>
        <GadgetList />
      </div>
    </>
  )
}

export default TopPage
