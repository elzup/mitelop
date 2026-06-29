import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { useTimer } from '../useTimer'

afterEach(() => {
  cleanup()
  jest.useRealTimers()
})

test('useTimer starts, pauses, resumes, and resets', () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date(2020, 2, 22, 22, 22, 0, 0))

  const { result } = renderHook(() => useTimer())

  expect(result.current.status).toBe('init')

  act(() => {
    result.current.start(30000)
  })

  expect(result.current.status).toBe('run')
  expect(result.current.time).toBe(30000)

  act(() => {
    jest.advanceTimersByTime(10000)
  })

  expect(result.current.time).toBeGreaterThan(0)
  expect(result.current.time).toBeLessThan(30000)

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
    result.current.resume()
    jest.advanceTimersByTime(1000)
  })

  expect(result.current.status).toBe('run')
  expect(result.current.time).toBeLessThan(pausedTime)

  act(() => {
    result.current.reset()
  })

  expect(result.current.status).toBe('init')
  expect(result.current.time).toBe(30000)
})
