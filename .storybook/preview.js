import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { theme, GlobalStyle } from '../src/utils/theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
]
