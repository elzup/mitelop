/** ガジェットの既定色を供給するカラーテーマ。個別に色指定したガジェットは優先される。 */
export type AppTheme = {
  id: string
  name: string
  /** ガジェット既定の背景 */
  bg: string
  /** ガジェット既定の文字色 */
  fg: string
  /** 差し色 */
  accent: string
}

export const APP_THEMES: AppTheme[] = [
  {
    id: 'dark',
    name: 'ダーク',
    bg: '#1b1b22',
    fg: '#f2f2f5',
    accent: '#7d92ff',
  },
  {
    id: 'light',
    name: 'ライト',
    bg: '#f5f5f7',
    fg: '#1a1a2e',
    accent: '#2b6cff',
  },
  {
    id: 'midnight',
    name: 'ミッドナイト',
    bg: '#0d1b3a',
    fg: '#cfe0ff',
    accent: '#ffb020',
  },
  {
    id: 'sakura',
    name: 'サクラ',
    bg: '#3a1030',
    fg: '#ffe3f1',
    accent: '#ff77aa',
  },
]

export const DEFAULT_THEME_ID = 'dark'

// config の色にこのセンチネルが入っていれば、描画時にテーマから解決する。
export const THEME_BG = 'theme:bg'
export const THEME_FG = 'theme:fg'
export const THEME_ACCENT = 'theme:accent'

export const isThemeColor = (value: string) => value.startsWith('theme:')

/** センチネルを現在のテーマ色に解決する。具体色 (hex 等) はそのまま返す。 */
export const resolveThemeColor = (value: string, theme: AppTheme): string => {
  if (value === THEME_BG) return theme.bg
  if (value === THEME_FG) return theme.fg
  if (value === THEME_ACCENT) return theme.accent

  return value
}
