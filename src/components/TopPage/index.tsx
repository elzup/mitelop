import {
  AppBar,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { GITHUB_LINK } from '../../config'
import GadgetList from './GadgetList'

const TopPage = () => {
  return (
    <>
      <AppBar position="static">
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
      </AppBar>
      <div style={{ margin: '8px' }}>
        <GadgetList />
      </div>
    </>
  )
}

export default TopPage
