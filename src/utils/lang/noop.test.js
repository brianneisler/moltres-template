import noop from './noop'

describe('lang.noop', () => {
  test('returns undefined', () => {
    expect(noop()).toBe(undefined)
  })
})
