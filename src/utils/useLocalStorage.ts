import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export const useTitleCheckLocalStorage = () =>
  useLocalStorage<Record<string, boolean>>('titles', {})
export const useTitleLocalStorage = () =>
  useLocalStorage<string[]>('titles-form', [])

const eventName = (key: string) => `local-storage:${key}`

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

function read<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue
  try {
    const item = window.localStorage.getItem(key)

    if (item === null) return initialValue
    const parsed = JSON.parse(item)

    // 保存値にない新キーは初期値で補完する (スキーマ変更で undefined を防ぐ)
    if (isPlainObject(parsed) && isPlainObject(initialValue)) {
      return { ...initialValue, ...parsed } as T
    }

    return parsed as T
  } catch (error) {
    console.log(error)
    return initialValue
  }
}

/**
 * localStorage 連動 state。
 * 同一キーの他インスタンス (同一ウィンドウ) / 他ウィンドウ (storage イベント) の
 * 変更を購読して同期する。Broadcast の複数インスタンスや子ウィンドウ編集の土台。
 */
export function useLocalStorage<T = unknown>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    read(key, initialValue)
  )
  const latest = useRef(storedValue)

  latest.current = storedValue

  useEffect(() => {
    const sync = () => {
      const next = read(key, initialValue)

      latest.current = next
      setStoredValue(next)
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) sync()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener(eventName(key), sync)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(eventName(key), sync)
    }
    // initialValue は再購読の必要がないので依存に含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        if (typeof window === 'undefined') return
        const next =
          value instanceof Function
            ? (value as (prev: T) => T)(latest.current)
            : value

        latest.current = next
        setStoredValue(next)
        window.localStorage.setItem(key, JSON.stringify(next))
        window.dispatchEvent(new Event(eventName(key)))
      } catch (error) {
        console.log(error)
      }
    },
    [key]
  )

  return [storedValue, setValue]
}
