import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import styled from 'styled-components'
import { GITHUB_LINK } from '../../config'
import GadgetList from './GadgetList'

const StyledAppBar = styled(AppBar)`
  @media (display-mode: standalone) {
    display: none;
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
      <Section>
        <div className="head">
          <LiveTvIcon />
          <Typography variant="h6">Broadcast</Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<LaunchIcon />}
            href="/broadcast"
          >
            放送枠を開く
          </Button>
        </div>
        <Typography variant="body2" color="textSecondary">
          ページ全体にガジェットを自由配置できるカスタムの放送枠。下の帯
          (テロップ) も切り替えられます。
        </Typography>
      </Section>
      <Section>
        <Typography variant="h6">Gadgets</Typography>
        <GadgetList />
      </Section>
    </>
  )
}

const Section = styled.div`
  margin: 16px 8px;
  .head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export default TopPage
