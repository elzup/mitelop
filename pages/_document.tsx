import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'
import React from 'react'

class Document extends NextDocument<{}> {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentSheets = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheets.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            ),
        })

      const initialProps = await NextDocument.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          materialUiSheets.getStyleElement(),
          styledComponentSheets.getStyleElement(),
        ],
      }
    } finally {
      styledComponentSheets.seal()
    }
  }

  render() {
    return (
      <Html lang={'ja'}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="/static/images/icon.png" />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/icon-4x.png"
            sizes="192x192"
          />

          <link rel="manifest" href="/static/manifest.json" />
          <link
            href="https://unpkg.com/sanitize.css/forms.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
