import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { advanceTo } from 'jest-date-mock'
import { useInterval } from '../useInterval'

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

jest.useFakeIntervals()
const date = new Date(2020, 2, 22, 22, 22, 0)

test('useInterval', () => {
  const { result } = renderHook(() => useInterval())

  act(() => {
    advanceTo(new Date(date).setSeconds(0, 0))
    jest.advanceIntervalsByTime(1000)
  })

  expect(result.current.status).toBe('init')

  result.current.start(30000) // 30s

  expect(result.current.status).toBe('run')

  act(() => {
    advanceTo(new Date(date).setSeconds(0.5, 0))
    jest.advanceIntervalsByTime(500)
  })
  expect(result.current.time).toMatchInlineSnapshot(`30000`)
  expect(result.current.flootTime).toMatchInlineSnapshot(`29000`)

  act(() => {
    advanceTo(new Date(date).setSeconds(9.5, 0))
    jest.advanceIntervalsByTime(9500)
  })
  expect(result.current.time).toMatchInlineSnapshot(`21000`)

  result.current.pause()

  expect(result.current.status).toBe('pause')

  act(() => {
    advanceTo(new Date(date).setSeconds(15, 0))
    jest.advanceIntervalsByTime(5000)
  })

  result.current.resume()

  act(() => {
    advanceTo(new Date(date).setSeconds(20, 0))
    jest.advanceIntervalsByTime(5000)
  })
  expect(result.current.time).toMatchInlineSnapshot(`16000`)
  expect(result.current.status).toBe('run')

  act(() => {
    advanceTo(new Date(date).setSeconds(41, 0))
    jest.advanceIntervalsByTime(21000)
  })
  expect(result.current.status).toBe('end')
  expect(result.current.time).toMatchInlineSnapshot(`0`)

  result.current.reset()
  expect(result.current.status).toBe('init')
  expect(result.current.time).toMatchInlineSnapshot(`30000`)
})
