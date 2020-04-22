import anyResolve from './anyResolve'

describe('anyResolve', () => {
  test('resolves already resolved values to themselves', () => {
    expect(anyResolve(undefined)).toBe(undefined)
    expect(anyResolve(null)).toBe(null)
    expect(anyResolve('')).toBe('')
    expect(anyResolve('abc')).toBe('abc')
    expect(anyResolve(false)).toBe(false)
    expect(anyResolve(true)).toBe(true)
    expect(anyResolve(0)).toBe(0)
    expect(anyResolve(-1)).toBe(-1)
    expect(anyResolve(1)).toBe(1)
    expect(anyResolve(NaN)).toBe(NaN)
    expect(anyResolve(Infinity)).toBe(Infinity)
    expect(anyResolve(-Infinity)).toBe(-Infinity)

    const object = {}
    expect(anyResolve(object)).toBe(object)
    const func = () => {}
    expect(anyResolve(func)).toBe(func)
    const array = []
    expect(array).toBe(array)
  })

  test('dispatches to the resolve method of last arg', () => {
    const resolvable = {
      resolve() {
        return 'foo'
      }
    }
    expect(anyResolve(resolvable)).toBe('foo')
  })

  test('re-resolves resolved values that are also resolvable', () => {
    const reresolvable = {
      resolve() {
        return {
          resolve() {
            return 'foo'
          }
        }
      }
    }
    expect(anyResolve(reresolvable)).toBe('foo')
  })
})
