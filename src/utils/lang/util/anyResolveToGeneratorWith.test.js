import anyIsGenerator from './anyIsGenerator'
import anyResolveToGeneratorWith from './anyResolveToGeneratorWith'

describe('resolveToGeneratorWith', () => {
  test('resolves basic values to a generator that resolves to the value', () => {
    expect(anyResolveToGeneratorWith(0, (value) => value).next().value).toBe(0)
    expect(anyResolveToGeneratorWith(1, (value) => value).next().value).toBe(1)
    expect(anyResolveToGeneratorWith(-1, (value) => value).next().value).toBe(
      -1
    )
    expect(anyResolveToGeneratorWith('', (value) => value).next().value).toBe(
      ''
    )
    expect(
      anyResolveToGeneratorWith('abc', (value) => value).next().value
    ).toBe('abc')
    expect(anyResolveToGeneratorWith(null, (value) => value).next().value).toBe(
      null
    )
    expect(
      anyResolveToGeneratorWith(undefined, (value) => value).next().value
    ).toBe(undefined)
    expect(anyResolveToGeneratorWith(true, (value) => value).next().value).toBe(
      true
    )
    expect(
      anyResolveToGeneratorWith(false, (value) => value).next().value
    ).toBe(false)
  })

  test('returned resolvable values are resolved to a generator', () => {
    expect(
      anyResolveToGeneratorWith(0, () => ({
        resolve: () => 1
      })).next()
    ).toEqual({
      done: true,
      value: 1
    })
  })

  test('resolves Promise to a Generator that yields the promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    const handler = jest.fn((value) => value)
    const generator = anyResolveToGeneratorWith(promise, handler)
    expect(anyIsGenerator(generator)).toBe(true)

    const nextPromise = generator.next()
    expect(nextPromise).toEqual({
      done: false,
      value: expect.any(Promise)
    })

    const promiseValue = await nextPromise.value
    expect(promiseValue).toBe('foo')

    const result = generator.next(promiseValue)
    expect(handler).toHaveBeenCalledWith('foo')
    expect(result).toEqual({
      done: true,
      value: 'foo'
    })
  })
})
