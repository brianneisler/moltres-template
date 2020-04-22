import anyIsGenerator from './anyIsGenerator'
import anyResolveWith from './anyResolveWith'

describe('anyResolveWith', () => {
  test('resolves basic values with sync identity function to themselves', () => {
    expect(anyResolveWith(0, (value) => value)).toBe(0)
    expect(anyResolveWith(1, (value) => value)).toBe(1)
    expect(anyResolveWith(-1, (value) => value)).toBe(-1)
    expect(anyResolveWith('', (value) => value)).toBe('')
    expect(anyResolveWith('abc', (value) => value)).toBe('abc')
    expect(anyResolveWith(null, (value) => value)).toBe(null)
    expect(anyResolveWith(undefined, (value) => value)).toBe(undefined)
    expect(anyResolveWith(true, (value) => value)).toBe(true)
    expect(anyResolveWith(false, (value) => value)).toBe(false)
  })

  test('returned resolvable values are resolved', () => {
    expect(
      anyResolveWith(0, () => ({
        resolve: () => 1
      }))
    ).toBe(1)
  })

  test('resolves Promise to a Promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    const handler = jest.fn(() => 'bar')
    const resolver = anyResolveWith(promise, handler)
    expect(resolver).toBeInstanceOf(Promise)
    const result = await resolver
    expect(handler).toHaveBeenCalledWith('foo')
    expect(handler).toHaveBeenCalledTimes(1)
    expect(result).toBe('bar')
  })

  test('handler that returns a Promise that resolves to a resolvable is resolved', async () => {
    const promise = new Promise((pResolve) => {
      pResolve({
        resolve: () => 'foo'
      })
    })
    const handler = jest.fn(() => promise)
    const resolver = anyResolveWith('bar', handler)
    expect(resolver).toBeInstanceOf(Promise)
    const result = await resolver
    expect(handler).toHaveBeenCalledWith('bar')
    expect(handler).toHaveBeenCalledTimes(1)
    expect(result).toBe('foo')
  })

  test('resolves Generator to a Generator', async () => {
    const generatorFn = function* () {
      yield 'foo'
      return 'bar'
    }
    const handler = jest.fn(() => 'baz')
    const generator = anyResolveWith(generatorFn(), handler)

    expect(anyIsGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      done: false,
      value: 'foo'
    })
    expect(generator.next()).toEqual({
      done: true,
      value: 'baz'
    })
    expect(handler).toHaveBeenCalledWith('bar')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('resolves Promise in a Promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve(
        new Promise((p2Resolve) => {
          setTimeout(() => {
            p2Resolve('foo')
          }, 0)
        })
      )
    })
    const handler = jest.fn(() => 'bar')
    const resolvedPromise = anyResolveWith(promise, handler)
    expect(resolvedPromise).toBeInstanceOf(Promise)
    const result = await resolvedPromise
    expect(result).toBe('bar')
    expect(handler).toHaveBeenCalledWith('foo')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('resolves Generator in a Promise first to a Promise then a Generator', async () => {
    const generatorFn = function* () {
      yield 'foo'
      return 'bar'
    }
    const promise = new Promise((pResolve) => {
      pResolve(generatorFn())
    })
    const handler = jest.fn(() => 'baz')
    const resolvedPromise = anyResolveWith(promise, handler)
    expect(resolvedPromise).toBeInstanceOf(Promise)
    const generator = await resolvedPromise

    expect(anyIsGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      done: false,
      value: 'foo'
    })
    expect(generator.next()).toEqual({
      done: true,
      value: 'baz'
    })
    expect(handler).toHaveBeenCalledWith('bar')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('resolves Promise in a Generator first to a Generator', async () => {
    const generatorFn = function* () {
      yield new Promise((pResolve) => pResolve('foo'))
      return 'bar'
    }
    const handler = jest.fn(() => 'baz')
    const generator = anyResolveWith(generatorFn(), handler)
    expect(anyIsGenerator(generator)).toBe(true)

    const firstNext = generator.next()
    expect(firstNext).toEqual({
      done: false,
      value: expect.any(Promise)
    })
    await firstNext.value
    const result = generator.next()
    expect(result).toEqual({
      done: true,
      value: 'baz'
    })
    expect(handler).toHaveBeenCalledWith('bar')
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
