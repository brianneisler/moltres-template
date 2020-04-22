import cacheMethod from './cacheMethod'

describe('cacheMethod', () => {
  test('cache is generated properly', () => {
    const context = {
      cache: {},
      system: {
        now: () => 0
      }
    }
    const cachedFunc = cacheMethod(
      {
        key: () => 'foo',
        ttl: 10
      },
      () => 'bar'
    )
    cachedFunc(context)
    expect(context.cache).toEqual({
      foo: {
        cachedAt: 0,
        result: 'bar'
      }
    })
  })

  test('oHit is called on a cache hit', () => {
    const context = {
      cache: {
        foo: {
          cachedAt: 0,
          result: 'bar'
        }
      },
      system: {
        now: () => 5
      }
    }
    const func = jest.fn()
    const key = jest.fn(() => 'foo')
    const onHit = jest.fn()
    const cachedFunc = cacheMethod(
      {
        key,
        onHit,
        ttl: 10
      },
      func
    )
    const result = cachedFunc(context, 'baz')
    expect(result).toBe('bar')
    expect(func).not.toHaveBeenCalled()
    expect(onHit).toHaveBeenCalledWith(context, 'baz')
  })
})
