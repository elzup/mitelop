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

/**
 * 設定・編集 UI 用の高密度テーマ。フィールドやボタンを小さく、余白を極端に詰める。
 * Broadcast の編集パネルなど、操作 UI 側だけを ThemeProvider で包んで使う。
 */
export const denseTheme = createTheme({
  palette: {
    primary: { main: '#2B0065' },
    secondary: orange,
  },
  spacing: 4,
  typography: { fontSize: 12 },
  props: {
    MuiTextField: { variant: 'outlined', size: 'small', margin: 'dense' },
    MuiButton: { variant: 'contained', size: 'small' },
    MuiIconButton: { size: 'small' },
    MuiSvgIcon: { fontSize: 'small' },
  },
  overrides: {
    MuiOutlinedInput: {
      input: { padding: '6px 8px', fontSize: 12 },
    },
    MuiInputLabel: {
      outlined: { transform: 'translate(8px, 8px) scale(1)' },
    },
    MuiButton: {
      root: { padding: '2px 8px', minWidth: 0 },
    },
    MuiFormControl: {
      marginDense: { marginTop: 2, marginBottom: 2 },
    },
  },
})
