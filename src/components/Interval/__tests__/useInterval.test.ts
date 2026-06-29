import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { useInterval } from '../useInterval'

afterEach(() => {
  cleanup()
  jest.useRealTimers()
})

const steps = [
  { name: 'A', sec: 5 },
  { name: 'B', sec: 10 },
  { name: 'C', sec: 15 },
]

test('useInterval marks the active step from elapsed seconds', () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date(2020, 2, 22, 22, 22, 0, 0))

  const { result } = renderHook(() => useInterval(steps))

  expect(result.current.status).toBe('run')
  expect(result.current.progress).toBe(0)
  expect(result.current.steps.map((step) => step.active)).toEqual([
    true,
    false,
    false,
  ])

  for (let i = 0; i < 6; i += 1) {
    act(() => {
      jest.advanceTimersByTime(1000)
    })
  }

  expect(result.current.steps.map((step) => step.active)).toEqual([
    false,
    true,
    false,
  ])

  act(() => {
    result.current.pause()
  })

  expect(result.current.status).toBe('stop')
})
