import { createTheme } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
`

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2B0065',
    },
    secondary: orange,
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiButton: {
      variant: 'contained',
    },
  },
})
