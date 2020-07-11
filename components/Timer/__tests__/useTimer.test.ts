import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { advanceTo } from 'jest-date-mock'
import { useTimer } from '../useTimer'

afterEach(cleanup)
const consoleError = console.error

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes(
        'Warning: An update to %s inside a test was not wrapped in act'
      )
    ) {
      consoleError(...args)
    }
  })
})

jest.useFakeTimers()
const date = new Date(2020, 2, 22, 22, 22, 0)

test('useTimer', () => {
  const { result } = renderHook(() => useTimer())

  act(() => {
    advanceTo(new Date(date).setSeconds(0, 0))
    jest.advanceTimersByTime(1000)
  })

  expect(result.current.status).toBe('pause')

  // @ts-ignore
  result.current.run()

  expect(result.current.status).toBe('run')

  act(() => {
    advanceTo(new Date(date).setSeconds(10, 0))
    jest.advanceTimersByTime(10000)
  })
  expect(result.current.time).toMatchInlineSnapshot(`10000`)

  result.current.pause()

  expect(result.current.status).toBe('pause')

  act(() => {
    advanceTo(new Date(date).setSeconds(15, 0))
    jest.advanceTimersByTime(5000)
  })

  result.current.run()

  act(() => {
    advanceTo(new Date(date).setSeconds(20, 0))
    jest.advanceTimersByTime(5000)
  })
  expect(result.current.time).toMatchInlineSnapshot(`15000`)
  expect(result.current.status).toBe('run')

  result.current.pause()
  result.current.reset()
  expect(result.current.time).toMatchInlineSnapshot(`0`)
})
