// 色・余白・角丸の共通トークン。styled-components 内での #2B0065 直書きを避ける。
export const tokens = {
  color: {
    primary: '#2b0065',
    primaryRing: 'rgba(43, 0, 101, 0.6)',
    primaryWeak: 'rgba(43, 0, 101, 0.08)',
    border: '#d8d8e0',
    surface: '#ffffff',
    text: '#1a1a2e',
    textWeak: '#6b6b80',
    overlayScrim: 'rgba(0, 0, 0, 0.04)',
  },
  radius: {
    sm: '4px',
    md: '8px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
  },
} as const
