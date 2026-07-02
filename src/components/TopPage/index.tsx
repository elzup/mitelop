import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
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
            variant="contained"
            color="primary"
            startIcon={<LaunchIcon />}
            href="/broadcast"
          >
            表示を開く
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            href="/broadcast/edit"
          >
            編集を開く
          </Button>
        </div>
        <Typography variant="body2" color="textSecondary">
          ページ全体にガジェットを自由配置できるカスタムの放送枠。Text
          ガジェットを全幅で下に置けばテロップにもなります。
        </Typography>
        <ul className="how">
          <li>
            <b>表示</b> (/broadcast) … ガジェットだけのクリーンな画面。OBS
            などでこのウィンドウをキャプチャします。右下にカーソルを寄せると出る
            編集ボタンからも操作画面を開けます。
          </li>
          <li>
            <b>編集</b> (/broadcast/edit) …
            子ウィンドウで配置・サイズ・各ガジェットの設定を操作。変更は表示側に
            リアルタイム反映されます (同じブラウザの別ウィンドウ間で同期)。
          </li>
        </ul>
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
    flex-wrap: wrap;
  }
  .how {
    margin: 4px 0 0;
    padding-left: 1.2em;
    max-width: 720px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.85rem;
    line-height: 1.6;
  }
`

export default TopPage
