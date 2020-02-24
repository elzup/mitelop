import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiButton: {
      variant: 'outlined',
    },
  },
})
