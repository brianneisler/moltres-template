import reduce from './reduce'

describe('reduce', () => {
  test('reduces array left to right', () => {
    const values = ['foo', 'bar', 'baz']
    const result = reduce((acc, value) => acc + value, '', values)
    expect(result).toEqual('foobarbaz')
  })

  test('calls reducer with index when reducing an array', () => {
    const values = ['foo', 'bar', 'baz']
    const reducer = jest.fn((identity) => identity)
    const result = reduce(reducer, '', values)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'foo', 0)
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bar', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'baz', 2)
    expect(result).toBe('')
  })

  test('calls reducer with index when reducing a string', () => {
    const values = 'foo'
    const reducer = jest.fn((identity) => identity)
    const result = reduce(reducer, '', values)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'f', 0)
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'o', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'o', 2)
    expect(result).toBe('')
  })

  test('reduces object left to right', () => {
    const object = {
      baz: 'bam',
      bim: 'bop',
      foo: 'bar'
    }
    const result = reduce((acc, value, key) => acc + value + key, '', object)
    expect(result).toEqual('bambazbopbimbarfoo')
  })

  test('calls reducer with key', () => {
    const object = {
      baz: 'bam',
      bim: 'bop',
      foo: 'bar'
    }
    const reducer = jest.fn((acc) => acc)
    const result = reduce(reducer, '', object)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'bam', 'baz')
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bop', 'bim')
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'bar', 'foo')
    expect(result).toBe('')
  })

  test('reduces over objects symbols', () => {
    const symA = Symbol('a')
    const symB = Symbol.for('b')
    const object = {
      [symA]: 'a',
      [symB]: 'b'
    }
    const reducer = jest.fn((acc, value) => value)
    const result = reduce(reducer, 'c', object)
    expect(reducer).toHaveBeenNthCalledWith(1, 'c', 'a', symA)
    expect(reducer).toHaveBeenNthCalledWith(2, 'a', 'b', symB)
    expect(result).toBe('b')
  })

  test('reduce object of functions', () => {
    const object = {
      async bam() {
        return 'bam'
      },
      async bim() {
        return 'bop'
      },
      async foo() {
        return 'foo'
      }
    }
    const reducer = (acc, method, name) => {
      acc.prototype[name] = method
      return acc
    }
    const result = reduce(reducer, class {}, object)
    expect(result.prototype).toEqual({
      bam: expect.any(Function),
      bim: expect.any(Function),
      foo: expect.any(Function)
    })
  })

  test('reduces an iterator', () => {
    const array = ['bar', 'bam', 'bop']
    const iterator = array[Symbol.iterator]()
    const reducer = jest.fn((acc, value) => value)
    const result = reduce(reducer, '', iterator)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'bar', 0)
    expect(reducer).toHaveBeenNthCalledWith(2, 'bar', 'bam', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, 'bam', 'bop', 2)
    expect(result).toEqual('bop')
  })

  test('does not resolve values of value when iterating over them', () => {
    const resolveable = {
      resolve() {
        return 'bam'
      }
    }
    const array = [Promise.resolve('foo'), resolveable]
    const reducer = (acc, value) => {
      acc.push(value)
      return acc
    }
    const result = reduce(reducer, [], array)
    expect(result).toEqual([Promise.resolve('foo'), resolveable])
  })

  test('upgrades to a Promise when an async iteratee is used', async () => {
    const array = ['a', 'b', 'c']
    let result = reduce(
      (acc, val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            acc.push([val, index])
            resolve(acc)
          }, 0)
        }),
      [],
      array
    )

    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ])
  })
})
