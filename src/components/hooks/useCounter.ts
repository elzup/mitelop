import { useState } from 'react'

export const useCounter = () => {
  const [count, setCount] = useState<number>(0)

  const add = (): void => {
    setCount((beforeCount) => beforeCount + 1)
  }

  const sub = (): void => {
    setCount((beforeCount) => Math.max(0, beforeCount - 1))
  }

  const reset = (): void => {
    setCount(0)
  }

  return { count, add, sub, reset }
}
