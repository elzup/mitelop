import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { useStopwatch } from '../useStopwatch'

afterEach(() => {
  cleanup()
  jest.useRealTimers()
})

test('useStopwatch runs, pauses, resumes, and resets', () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date(2020, 2, 22, 22, 22, 0, 0))

  const { result } = renderHook(() => useStopwatch())

  expect(result.current.status).toBe('pause')
  expect(result.current.time).toBe(0)

  act(() => {
    result.current.run()
    jest.advanceTimersByTime(10000)
  })

  expect(result.current.status).toBe('run')
  expect(result.current.time).toBeGreaterThan(0)

  act(() => {
    result.current.pause()
  })

  expect(result.current.status).toBe('pause')
  const pausedTime = result.current.time

  act(() => {
    jest.advanceTimersByTime(5000)
  })

  expect(result.current.time).toBe(pausedTime)

  act(() => {
    result.current.run()
    jest.advanceTimersByTime(1000)
  })

  expect(result.current.time).toBeGreaterThan(pausedTime)

  act(() => {
    result.current.reset()
  })

  expect(result.current.status).toBe('pause')
  expect(result.current.time).toBe(0)
})
