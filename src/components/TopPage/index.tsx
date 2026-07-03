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
            開く
          </Button>
        </div>
        <Typography variant="body2" color="textSecondary">
          ページ全体にガジェットを自由配置できるカスタムの放送枠。Text
          ガジェットを全幅で下に置けばテロップにもなります。表示・操作・設定を
          別々のウィンドウに分け、OBS では表示ウィンドウ (stage)
          だけをキャプチャします。
        </Typography>
        <ul className="how">
          <li>
            <b>表示 (stage)</b> …
            ガジェットだけのクリーンな画面。右下にカーソルを
            寄せると出るボタンからコントロール窓を開けます。
          </li>
          <li>
            <EditIcon fontSize="inherit" /> <b>コントロール窓</b> …
            出しっぱなしにできる別窓。ガジェットの追加・配置一覧・stage
            編集トグルを操作します。
          </li>
          <li>
            <b>設定窓</b> …
            配置した各ガジェットの歯車から、そのガジェット専用の設定窓を開きます
            (複数同時可)。すべての変更はウィンドウ間でリアルタイム同期。
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
