/** Tauri (ネイティブ) 上で動いているか。web ビルドでは false。 */
export const isTauri = (): boolean =>
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
