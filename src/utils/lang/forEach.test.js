import ImmutableMap from './classes/ImmutableMap'
import forEach from './forEach'

describe('forEach', () => {
  describe('Array', () => {
    test('forEach value in an Array', () => {
      const array = ['a', 'b', 'c']
      const acc = []
      const result = forEach((val, index) => acc.push([val, index]), array)
      expect(acc).toEqual([
        ['a', 0],
        ['b', 1],
        ['c', 2]
      ])
      expect(result).toBe(array)
    })
  })

  describe('Object', () => {
    test('forEach value in an Object', () => {
      const object = { a: 'valueA', b: 'valueB', c: 'valueC' }
      const acc = []
      const result = forEach((val, key) => acc.push([val, key]), object)
      expect(acc).toEqual([
        ['valueA', 'a'],
        ['valueB', 'b'],
        ['valueC', 'c']
      ])
      expect(result).toBe(object)
    })

    test('forEach value in an Object with symbols as keys', () => {
      const symA = Symbol('a')
      const symB = Symbol('b')
      const object = { [symA]: 'valueA', [symB]: 'valueB' }
      const acc = []
      const result = forEach((val, key) => acc.push([val, key]), object)
      expect(acc).toEqual([
        ['valueA', symA],
        ['valueB', symB]
      ])
      expect(result).toBe(object)
    })
  })

  describe('ImmutableMap', () => {
    test('forEach value in an ImmutableMap', () => {
      const map = new ImmutableMap({ a: 'valueA', b: 'valueB', c: 'valueC' })
      const acc = []
      const result = forEach((val, key) => acc.push([val, key]), map)
      expect(acc).toEqual([
        ['valueA', 'a'],
        ['valueB', 'b'],
        ['valueC', 'c']
      ])
      expect(result).toBe(map)
    })
  })

  test('upgrades to a Promise when an async iteratee is used', async () => {
    const array = ['a', 'b', 'c']
    const acc = []
    let result = forEach(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            acc.push([val, index])
            resolve()
          }, 0)
        }),
      array
    )

    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(acc).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ])
    expect(result).toBe(array)
  })

  test('executes async in series', async () => {
    const array = ['a', 'b', 'c']
    const acc = []
    const iteratee = jest.fn(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            expect(iteratee).toHaveBeenCalledTimes(index + 1)
            acc.push([val, index])
            resolve()
          }, 0)
        })
    )
    let result = forEach(iteratee, array)
    expect(iteratee).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(acc).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ])
    expect(result).toBe(array)
  })
})
