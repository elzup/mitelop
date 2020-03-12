import { renderHook, act } from '@testing-library/react-hooks'
import { advanceTo } from 'jest-date-mock'
import { useStopwatch } from '../useStopwatch'

jest.useFakeTimers()
const date = new Date(2020, 2, 22, 22, 22, 0)

test('useStopwatch', () => {
  const { result } = renderHook(() => useStopwatch())

  act(() => {
    advanceTo(new Date(date).setSeconds(0, 0))
    jest.advanceTimersByTime(1000)
  })

  expect(result.current.status).toBe('init')

  // @ts-ignore
  result.current.actions.setStart()

  expect(result.current.status).toBe('run')

  act(() => {
    advanceTo(new Date(date).setSeconds(10, 0))
    jest.advanceTimersByTime(10000)
  })
  expect(result.current.time).toMatchInlineSnapshot()
})
