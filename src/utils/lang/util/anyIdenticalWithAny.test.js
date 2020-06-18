import anyIdenticalWithAny from './anyIdenticalWithAny'

describe('anyIdenticalWithAny', () => {
  test('returns true for primitive values', () => {
    expect(anyIdenticalWithAny(undefined, undefined)).toBe(true)
    expect(anyIdenticalWithAny(null, null)).toBe(true)
    expect(anyIdenticalWithAny('', '')).toBe(true)
    expect(anyIdenticalWithAny('abc', 'abc')).toBe(true)
    expect(anyIdenticalWithAny(0, 0)).toBe(true)
    expect(anyIdenticalWithAny(-1, -1)).toBe(true)
    expect(anyIdenticalWithAny(1, 1)).toBe(true)
    expect(anyIdenticalWithAny(true, true)).toBe(true)

    expect(anyIdenticalWithAny(false, false)).toBe(true)
    expect(anyIdenticalWithAny(Infinity, Infinity)).toBe(true)
    expect(anyIdenticalWithAny(-Infinity, -Infinity)).toBe(true)
  })

  test('primitives are not anyIdenticalWithAny to native objects of the same value', () => {
    expect(anyIdenticalWithAny(new Boolean(true), true)).toBe(false)
    expect(anyIdenticalWithAny(new String(''), '')).toBe(false)
    expect(anyIdenticalWithAny(new Number(0), 0)).toBe(false)
  })

  test('returns true for NaN', () => {
    expect(anyIdenticalWithAny(NaN, NaN)).toBe(true)
  })

  test('returns true for two references to the same object instance', () => {
    const object = {}
    expect(anyIdenticalWithAny(object, object)).toBe(true)
  })

  test('returns false for two equal objects that are different instances', () => {
    expect(anyIdenticalWithAny({ foo: 'bar' }, { foo: 'bar' })).toBe(false)
  })

  test('returns false for 0 and -0', () => {
    expect(anyIdenticalWithAny(0, -0)).toBe(false)
  })

  test('returns false for undefined and null', () => {
    expect(anyIdenticalWithAny(undefined, null)).toBe(false)
  })
})
