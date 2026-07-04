/** Tauri (ネイティブ) 上で動いているか。web ビルドでは false。 */
export const isTauri = (): boolean =>
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

/** macOS か。ウィンドウの閉じるボタンを左上に置くなどの分岐に使う。 */
export const isMac = (): boolean =>
  typeof navigator !== 'undefined' &&
  /Mac/i.test(navigator.platform || navigator.userAgent)
