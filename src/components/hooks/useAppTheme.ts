import { useLocalStorage } from '../../utils/useLocalStorage'
import {
  APP_THEMES,
  AppTheme,
  DEFAULT_THEME_ID,
  resolveThemeColor,
} from '../../utils/themes'

/**
 * 現在のアプリテーマ (ガジェット既定色) をウィンドウ間で同期して返す。
 * `resolve` は config の色センチネルを現在のテーマ色へ解決する。
 */
export function useAppTheme() {
  const [id, setId] = useLocalStorage<string>('app-theme', DEFAULT_THEME_ID)
  const theme: AppTheme = APP_THEMES.find((t) => t.id === id) ?? APP_THEMES[0]

  return {
    theme,
    themeId: theme.id,
    setThemeId: setId,
    resolve: (value: string) => resolveThemeColor(value, theme),
  }
}
