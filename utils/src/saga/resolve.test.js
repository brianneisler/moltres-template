import isGenerator from '../data/isGenerator'
import resolve from './resolve'

describe('resolve', () => {
  test('resolves basic values to themselves', () => {
    expect(resolve(0)).toBe(0)
    expect(resolve(1)).toBe(1)
    expect(resolve(-1)).toBe(-1)
    expect(resolve('')).toBe('')
    expect(resolve('abc')).toBe('abc')
    expect(resolve(null)).toBe(null)
    expect(resolve(undefined)).toBe(undefined)
    expect(resolve(true)).toBe(true)
    expect(resolve(false)).toBe(false)
  })

  test('resolves Promise to a Promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    expect(resolve(promise)).toBeInstanceOf(Promise)
    const result = await promise
    expect(result).toBe('foo')
  })

  test('resolves Generator to a Generator', async () => {
    const generatorFn = function*() {
      yield 'foo'
      return 'bar'
    }
    const generator = resolve(generatorFn())

    expect(isGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      value: 'foo',
      done: false
    })
    expect(generator.next()).toEqual({
      value: 'bar',
      done: true
    })
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
    const resolvedPromise = resolve(promise)
    expect(resolvedPromise).toBeInstanceOf(Promise)
    const result = await resolvedPromise
    expect(result).toBe('foo')
  })

  test('resolves Generator in a Promise first to a Promise then a Generator', async () => {
    const generatorFn = function*() {
      yield 'foo'
      return 'bar'
    }
    const promise = new Promise((pResolve) => {
      pResolve(generatorFn())
    })
    const resolvedPromise = resolve(promise)
    expect(resolvedPromise).toBeInstanceOf(Promise)
    const generator = await resolvedPromise

    expect(isGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      value: 'foo',
      done: false
    })
    expect(generator.next()).toEqual({
      value: 'bar',
      done: true
    })
  })

  test('resolves Promise in a Generator first to a Generator', async () => {
    const generatorFn = function*() {
      const val = yield new Promise((pResolve) => pResolve('foo'))
      return val + 'bar'
    }
    const generator = resolve(generatorFn())
    expect(isGenerator(generator)).toBe(true)
    const firstNext = generator.next()
    expect(firstNext).toEqual({
      value: expect.any(Promise),
      done: false
    })
    const promiseValue = await firstNext.value
    const result = generator.next(promiseValue)
    expect(result).toEqual({
      value: 'foobar',
      done: true
    })
  })
})
