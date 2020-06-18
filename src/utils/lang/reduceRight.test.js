import reduceRight from './reduceRight'

describe('reduceRight', () => {
  test('reduces array right to left', () => {
    const values = ['foo', 'bar', 'baz']
    const result = reduceRight((acc, value) => acc + value, '', values)
    expect(result).toEqual('bazbarfoo')
  })

  test('reducing an empty array does not trigger the reducer', () => {
    const values = []
    const accum = {}
    const reducer = jest.fn()
    const result = reduceRight(reducer, accum, values)
    expect(result).toBe(accum)
    expect(reducer).toHaveBeenCalledTimes(0)
  })

  test('calls reducer with index', () => {
    const values = ['foo', 'bar', 'baz']
    const reducer = jest.fn((identity) => identity)
    const result = reduceRight(reducer, '', values)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'baz', 2)
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bar', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'foo', 0)
    expect(result).toBe('')
  })

  test('reduces object right to left', () => {
    const object = {
      baz: 'bam',
      bim: 'bop',
      foo: 'bar'
    }
    const result = reduceRight(
      (acc, value, key) => acc + value + key,
      '',
      object
    )
    expect(result).toEqual('barfoobopbimbambaz')
  })

  test('calls reducer with key', () => {
    const object = {
      baz: 'bam',
      bim: 'bop',
      foo: 'bar'
    }
    const reducer = jest.fn((acc) => acc)
    const result = reduceRight(reducer, '', object)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'bar', 'foo')
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bop', 'bim')
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'bam', 'baz')
    expect(result).toBe('')
  })

  test('reduceRight object of functions', () => {
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
    const result = reduceRight(reducer, class {}, object)
    expect(result.prototype).toEqual({
      bam: expect.any(Function),
      bim: expect.any(Function),
      foo: expect.any(Function)
    })
  })

  test('upgrades to a Promise when an async iteratee is used', async () => {
    const array = ['a', 'b', 'c']
    let result = reduceRight(
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
      ['c', 2],
      ['b', 1],
      ['a', 0]
    ])
  })
})
