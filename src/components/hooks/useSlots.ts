import { useCallback, useMemo } from 'react'
import { useLocalStorage } from '../../utils/useLocalStorage'

export type ConfigSlot<T = unknown> = { id: string; name: string; config: T }
export type SlotStore<T = unknown> = {
  order: string[]
  slots: Record<string, ConfigSlot<T>>
}

const SEED_ID = 's1'
const storageKey = (key: string) => `config-slots-${key}`

export const genSlotId = () =>
  `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

const readLegacy = <T>(legacyKey: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(legacyKey)

    if (!raw) return fallback

    return { ...fallback, ...JSON.parse(raw) } as T
  } catch {
    return fallback
  }
}

/** 未保存時の初期ストア。旧 `config-<legacyId>` があれば既定スロットへ取り込む。 */
export const seedStore = <T>(
  key: string,
  defaultConfig: T,
  legacyId?: string
): SlotStore<T> => {
  const seed = readLegacy(`config-${legacyId ?? key}`, defaultConfig)

  return {
    order: [SEED_ID],
    slots: { [SEED_ID]: { id: SEED_ID, name: '既定', config: seed } },
  }
}

const readStore = <T>(key: string): SlotStore<T> | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(storageKey(key))

    return raw ? (JSON.parse(raw) as SlotStore<T>) : null
  } catch {
    return null
  }
}

/**
 * hook 外 (addGadget など) からスロットを 1 つ作って id を返す。
 * localStorage に直接書き、useLocalStorage が購読する same-window イベントを発火する。
 */
export const createSlot = <T>(
  key: string,
  defaultConfig: T,
  seed: T | undefined,
  name: string,
  legacyId?: string
): string => {
  const store = readStore<T>(key) ?? seedStore(key, defaultConfig, legacyId)
  const id = genSlotId()
  const next: SlotStore<T> = {
    order: [...store.order, id],
    slots: {
      ...store.slots,
      [id]: { id, name, config: seed ?? defaultConfig },
    },
  }

  try {
    window.localStorage.setItem(storageKey(key), JSON.stringify(next))
    window.dispatchEvent(new Event(`local-storage:${storageKey(key)}`))
  } catch {
    // localStorage 不可環境では黙って諦める
  }

  return id
}

/**
 * hook 外からスロットを 1 つ削除する (単体インスタンス窓を閉じたときの後始末)。
 * 最後の 1 つは履歴として残す。
 */
export const deleteSlot = (key: string, id: string): void => {
  const store = readStore(key)

  if (!store || store.order.length <= 1 || !store.slots[id]) return
  const next = {
    order: store.order.filter((x) => x !== id),
    slots: Object.fromEntries(
      Object.entries(store.slots).filter(([x]) => x !== id)
    ),
  }

  try {
    window.localStorage.setItem(storageKey(key), JSON.stringify(next))
    window.dispatchEvent(new Event(`local-storage:${storageKey(key)}`))
  } catch {
    // localStorage 不可環境では黙って諦める
  }
}

/**
 * ガジェット種別ごとの設定スロット (プリセット) ライブラリ。
 * standalone / broadcast 双方が同じ `config-slots-<key>` を参照し、slotId で 1 つを指す。
 * 複数インスタンスが別スロットを持てば設定は独立し、削除しても履歴として残る。
 */
export function useSlots<T>(key: string, defaultConfig: T, legacyId?: string) {
  const initial = useMemo(
    () => seedStore(key, defaultConfig, legacyId),
    // シードは初回のみ。key が変わらない前提で固定する
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const [store, setStore] = useLocalStorage<SlotStore<T>>(
    storageKey(key),
    initial
  )
  const firstId = store.order[0] ?? SEED_ID

  const getSlot = useCallback(
    (id?: string): ConfigSlot<T> =>
      (id ? store.slots[id] : undefined) ??
      store.slots[firstId] ??
      initial.slots[SEED_ID],
    [store, firstId, initial]
  )

  const setSlotConfig = useCallback(
    (id: string, updater: T | ((prev: T) => T)) =>
      setStore((s) => {
        const cur = s.slots[id]

        if (!cur) return s
        const next =
          typeof updater === 'function'
            ? (updater as (p: T) => T)(cur.config)
            : updater

        return { ...s, slots: { ...s.slots, [id]: { ...cur, config: next } } }
      }),
    [setStore]
  )

  const addSlot = useCallback(
    (seed?: T, name?: string): string => {
      const id = genSlotId()

      setStore((s) => ({
        order: [...s.order, id],
        slots: {
          ...s.slots,
          [id]: {
            id,
            name: name ?? `スロット ${s.order.length + 1}`,
            config: seed ?? defaultConfig,
          },
        },
      }))

      return id
    },
    [setStore, defaultConfig]
  )

  const renameSlot = useCallback(
    (id: string, name: string) =>
      setStore((s) =>
        s.slots[id]
          ? { ...s, slots: { ...s.slots, [id]: { ...s.slots[id], name } } }
          : s
      ),
    [setStore]
  )

  const removeSlot = useCallback(
    (id: string) =>
      setStore((s) => {
        if (s.order.length <= 1) return s // 最後の 1 つは残す

        return {
          order: s.order.filter((x) => x !== id),
          slots: Object.fromEntries(
            Object.entries(s.slots).filter(([x]) => x !== id)
          ),
        }
      }),
    [setStore]
  )

  return {
    order: store.order,
    slots: store.slots,
    firstId,
    getSlot,
    setSlotConfig,
    addSlot,
    renameSlot,
    removeSlot,
  }
}
