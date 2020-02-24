import { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from '../utils/theme'
import 'rc-slider/assets/index.css'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default App
