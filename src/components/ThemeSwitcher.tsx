import { MenuItem, TextField } from '@material-ui/core'
import { APP_THEMES } from '../utils/themes'
import { useAppTheme } from './hooks/useAppTheme'

/** ガジェット既定色のテーマを切り替える (ウィンドウ間で同期)。 */
export function ThemeSwitcher() {
  const { themeId, setThemeId } = useAppTheme()

  return (
    <TextField
      select
      size="small"
      label="テーマ"
      value={themeId}
      onChange={(e) => setThemeId(e.target.value)}
    >
      {APP_THEMES.map((t) => (
        <MenuItem key={t.id} value={t.id}>
          {t.name}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default ThemeSwitcher
