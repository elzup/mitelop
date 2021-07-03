import { createMuiTheme } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'

export const theme = createMuiTheme({
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
