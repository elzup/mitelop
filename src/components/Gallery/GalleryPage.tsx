import { ThemeProvider } from '@material-ui/core'
import { useState } from 'react'
import styled from 'styled-components'
import { denseTheme } from '../../utils/theme'
import { tokens } from '../../utils/tokens'
import { GadgetDef, gadgets } from '../gadgets'
import { LayoutPicker } from '../LayoutPicker'
import { ThemeSwitcher } from '../ThemeSwitcher'

/** 1 つのガジェットの「表示 + 設定UI」を 1 カードにまとめる */
function GalleryItem({ def }: { def: GadgetDef }) {
  const spec = def.config
  const [config, setConfig] = useState(spec?.defaultConfig)
  const Atom = spec?.Atom
  const Editor = spec?.ConfigEditor

  return (
    <Card>
      <header>
        <b>{def.title}</b>
        <code>{def.key}</code>
        {def.nativeOnly && <span className="badge">Native</span>}
        {def.transparentWindow && <span className="badge t">透過</span>}
      </header>
      <div className="preview">
        {Atom ? (
          <Atom config={config} setConfig={setConfig} />
        ) : (
          <def.Component />
        )}
      </div>
      {Editor && (
        <ThemeProvider theme={denseTheme}>
          <div className="editor">
            {spec?.layouts && (
              <LayoutPicker
                layouts={spec.layouts}
                value={config.layout ?? spec.layouts[0].id}
                onSelect={(id) => setConfig({ ...config, layout: id })}
              />
            )}
            <Editor config={config} setConfig={setConfig} />
          </div>
        </ThemeProvider>
      )}
    </Card>
  )
}

/**
 * 全ガジェットの表示 + 設定UI を 1 ページで一覧する自作ギャラリー (/gallery)。
 * テーマ切替でまとめて色バグを点検できる。Storybook の代わり。
 */
function GalleryPage() {
  return (
    <Page>
      <Head>
        <h1>UI ギャラリー</h1>
        <ThemeProvider theme={denseTheme}>
          <ThemeSwitcher />
        </ThemeProvider>
      </Head>
      <Grid>
        {gadgets.map((def) => (
          <GalleryItem key={def.key} def={def} />
        ))}
      </Grid>
    </Page>
  )
}

const Page = styled.div`
  min-height: 100vh;
  background: #ececef;
  padding: 12px;
  box-sizing: border-box;
`
const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;

  h1 {
    font-size: 18px;
    margin: 0;
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  align-items: start;
`
const Card = styled.div`
  background: ${tokens.color.surface};
  border: 1px solid ${tokens.color.border};
  border-radius: ${tokens.radius.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    border-bottom: 1px solid ${tokens.color.border};
    font-size: 13px;

    code {
      font-size: 10px;
      color: ${tokens.color.textWeak};
    }
    .badge {
      margin-left: auto;
      padding: 0 5px;
      border-radius: 6px;
      font-size: 9px;
      color: #fff;
      background: ${tokens.color.primary};
    }
    .badge.t {
      margin-left: 4px;
      background: #1f9d55;
    }
  }
  .preview {
    position: relative;
    height: 150px;
    overflow: hidden;
    /* 透過を見分けるためのチェッカーボード */
    background-color: #fff;
    background-image: linear-gradient(45deg, #e2e2ea 25%, transparent 25%),
      linear-gradient(-45deg, #e2e2ea 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #e2e2ea 75%),
      linear-gradient(-45deg, transparent 75%, #e2e2ea 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0;
  }
  .editor {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px;
    border-top: 1px dashed ${tokens.color.border};
    max-height: 340px;
    overflow-y: auto;
  }
`

export default GalleryPage
