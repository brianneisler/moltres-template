import resolve from './resolve'

describe('resolve', () => {
  test('resolves basic values to themselves', () => {
    expect(resolve(0).next().value).toBe(0)
    expect(resolve(1).next().value).toBe(1)
    expect(resolve(-1).next().value).toBe(-1)
    expect(resolve('').next().value).toBe('')
    expect(resolve('abc').next().value).toBe('abc')
    expect(resolve(null).next().value).toBe(null)
    expect(resolve(undefined).next().value).toBe(undefined)
    expect(resolve(true).next().value).toBe(true)
    expect(resolve(false).next().value).toBe(false)
  })
})
