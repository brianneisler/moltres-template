import op from '../op'

import anyIsGenerator from './anyIsGenerator'
import anyResolveToGenerator from './anyResolveToGenerator'

describe('resolveToGenerator', () => {
  test('resolves basic values to a generator that resolves to the value', () => {
    expect(anyResolveToGenerator(0).next().value).toBe(0)
    expect(anyResolveToGenerator(1).next().value).toBe(1)
    expect(anyResolveToGenerator(-1).next().value).toBe(-1)
    expect(anyResolveToGenerator('').next().value).toBe('')
    expect(anyResolveToGenerator('abc').next().value).toBe('abc')
    expect(anyResolveToGenerator(null).next().value).toBe(null)
    expect(anyResolveToGenerator(undefined).next().value).toBe(undefined)
    expect(anyResolveToGenerator(true).next().value).toBe(true)
    expect(anyResolveToGenerator(false).next().value).toBe(false)
  })

  test('resolves resolvable values to a generator that resolves to the value', () => {
    expect(
      anyResolveToGenerator({
        resolve: () => 1
      }).next()
    ).toEqual({
      done: true,
      value: 1
    })
  })

  test('resolves ops to a generator that resolves to the op', () => {
    const operation = op(() => {})
    expect(
      anyResolveToGenerator({
        resolve: () => operation
      }).next()
    ).toEqual({
      done: false,
      value: operation
    })
  })

  test('resolves Promise to a Generator that yields the promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    const generator = anyResolveToGenerator(promise)
    expect(anyIsGenerator(generator)).toBe(true)

    const nextPromise = generator.next()
    expect(nextPromise.value).toBeInstanceOf(Promise)

    const promiseValue = await nextPromise.value

    const result = generator.next(promiseValue)
    expect(result).toEqual({
      done: true,
      value: 'foo'
    })
  })

  test('resolves Generator to a Generator', async () => {
    const generatorFn = function* () {
      yield 'foo'
      return 'bar'
    }
    const generator = anyResolveToGenerator(generatorFn())

    expect(anyIsGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      done: false,
      value: 'foo'
    })
    expect(generator.next()).toEqual({
      done: true,
      value: 'bar'
    })
  })
})
