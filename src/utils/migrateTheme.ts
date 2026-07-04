import { THEME_ACCENT, THEME_BG, THEME_FG } from './themes'

/**
 * テーマ導入前に保存された「旧デフォルト色」を、対応するテーマセンチネルへ
 * 一度だけ置換する。ユーザーが明示的に選んだ色 (旧デフォルトと異なる値) は触らない。
 * これで既存ガジェットもテーマ切替に追従するようになる。
 */
const FLAG = 'theme-migrated-v1'

/** gadgetKey → フィールド名 → { 旧デフォルト色(小文字): センチネル } */
const MIGRATION: Record<string, Record<string, Record<string, string>>> = {
  'gad-color': { color: { '#2b0065': THEME_ACCENT } },
  'gad-text': {
    bgColor: { '#222222': THEME_BG },
    fontColor: { '#ffffff': THEME_FG },
  },
  'gad-compass': { color: { '#c2452d': THEME_ACCENT } },
  'gad-protractor': { color: { '#1f4e9e': THEME_ACCENT } },
  'gad-frame': {
    borderColor: { '#ffffff': THEME_ACCENT },
    bgColor: { '#000000': THEME_BG },
  },
}

const mapped = (colorMap: Record<string, string>, value: unknown): unknown =>
  typeof value === 'string' ? colorMap[value.toLowerCase()] ?? value : value

export function migrateThemeDefaults(): void {
  if (typeof window === 'undefined') return
  try {
    if (window.localStorage.getItem(FLAG)) return

    Object.entries(MIGRATION).forEach(([gadgetKey, fields]) => {
      const key = `config-slots-${gadgetKey}`
      const raw = window.localStorage.getItem(key)

      if (!raw) return
      const store = JSON.parse(raw)

      if (!store || typeof store.slots !== 'object') return
      let changed = false

      Object.values(store.slots).forEach((slot) => {
        const cfg = (slot as { config?: Record<string, unknown> })?.config

        if (!cfg) return
        Object.entries(fields).forEach(([field, colorMap]) => {
          const next = mapped(colorMap, cfg[field])

          if (next !== cfg[field]) {
            cfg[field] = next
            changed = true
          }
        })
      })

      if (changed) {
        window.localStorage.setItem(key, JSON.stringify(store))
        // 開いている購読ウィンドウに即反映させる
        window.dispatchEvent(new Event(`local-storage:${key}`))
      }
    })

    window.localStorage.setItem(FLAG, '1')
  } catch (error) {
    console.log(error)
  }
}
