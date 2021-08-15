import { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import Head from 'next/head'
import { theme, GlobalStyle } from '../utils/theme'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="shortcut icon" href="/images/icon.png" />
      <link
        rel="icon"
        type="image/png"
        href="/images/icon-4x.png"
        sizes="192x192"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

      <link rel="manifest" href="/manifest.json" />
      <link href="https://unpkg.com/sanitize.css/forms.css" rel="stylesheet" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default App
