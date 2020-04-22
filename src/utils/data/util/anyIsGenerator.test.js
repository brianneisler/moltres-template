import anyIsGenerator from './anyIsGenerator'

describe('anyIsGenerator', () => {
  test('identifies a generator returned from a generator function', () => {
    const testGenerator = (function* () {})()
    expect(anyIsGenerator(testGenerator)).toBe(true)
  })

  test('identifies a generator created from basic object', () => {
    const testGenerator = {
      next: () => {},
      throw: () => {}
    }
    expect(anyIsGenerator(testGenerator)).toBe(true)
  })

  test('is not a generator when object is missing next method', () => {
    const testGenerator = {
      throw: () => {}
    }
    expect(anyIsGenerator(testGenerator)).toBe(false)
  })
})
