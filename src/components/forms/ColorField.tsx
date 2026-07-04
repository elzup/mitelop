import { Button, TextField } from '@material-ui/core'
import { isThemeColor } from '../../utils/themes'

type Props = {
  label: string
  value: string
  onChange: (v: string) => void
  onMouseDown?: () => void
  /** 指定すると「テーマ」トグルが出る。押すとこのセンチネル値に切り替わる */
  themeSentinel?: string
  /** センチネルを表示用の具体色に解決する (テーマ由来の色を色ピッカーに映す) */
  resolve?: (v: string) => string
}

const ColorField = ({
  label,
  value,
  onChange,
  onMouseDown,
  themeSentinel,
  resolve,
}: Props) => {
  const isTheme = isThemeColor(value)
  const shown = resolve ? resolve(value) : value

  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      <TextField
        label={label}
        size="small"
        value={isTheme ? 'テーマ' : value}
        disabled={isTheme}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        value={shown}
        type="color"
        onMouseDown={onMouseDown}
        onChange={(e) => onChange(e.target.value)}
      />
      {themeSentinel && (
        <Button
          size="small"
          variant={isTheme ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => onChange(isTheme ? shown : themeSentinel)}
        >
          テーマ
        </Button>
      )}
    </div>
  )
}

export default ColorField
