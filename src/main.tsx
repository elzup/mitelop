import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { migrateThemeDefaults } from './utils/migrateTheme'
import { theme, GlobalStyle } from './utils/theme'

// 旧デフォルト色をテーマセンチネルへ一度だけ移行 (既存ガジェットのテーマ追従)
migrateThemeDefaults()

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element was not found')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
