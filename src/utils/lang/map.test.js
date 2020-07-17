import { ImmutableList } from './classes'
import map from './map'

describe('map', () => {
  describe('Array', () => {
    test('maps array left to right', () => {
      const values = ['foo', 'bar', 'baz']
      const result = map((value) => value + '1', values)
      expect(result).toEqual(['foo1', 'bar1', 'baz1'])
    })

    test('calls iteratee with index and value when mapping over array', () => {
      const values = ['foo', 'bar', 'baz']
      const iteratee = jest.fn((identity) => identity)
      const result = map(iteratee, values)
      expect(iteratee).toHaveBeenNthCalledWith(1, 'foo', 0, values)
      expect(iteratee).toHaveBeenNthCalledWith(2, 'bar', 1, values)
      expect(iteratee).toHaveBeenNthCalledWith(3, 'baz', 2, values)
      expect(result).toEqual(['foo', 'bar', 'baz'])
    })

    test('upgrades to a Promise when an async iteratee is used', async () => {
      const array = ['a', 'b', 'c']
      let result = map(
        (val, index) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([val, index])
            }, 0)
          }),
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

    test('upgrades to a Promise when an async iteratee is used', async () => {
      const array = ['a', 'b', 'c']
      let result = map(
        (val, index) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([val, index])
            }, 0)
          }),
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

    test('executes async in series', async () => {
      const array = ['a', 'b', 'c']
      const iteratee = jest.fn(
        (val, index) =>
          new Promise((resolve) => {
            setTimeout(() => {
              expect(iteratee).toHaveBeenCalledTimes(index + 1)
              resolve([val, index])
            }, 0)
          })
      )
      let result = map(iteratee, array)
      expect(iteratee).toHaveBeenCalledTimes(1)
      expect(result).toBeInstanceOf(Promise)
      result = await result
      expect(result).toEqual([
        ['a', 0],
        ['b', 1],
        ['c', 2]
      ])
    })
  })

  describe('String', () => {
    test('calls iteratee with index and character when mapping over string', () => {
      const values = 'foo'
      const iteratee = jest.fn((identity) => identity)
      const result = map(iteratee, values)
      expect(iteratee).toHaveBeenNthCalledWith(1, 'f', 0, values)
      expect(iteratee).toHaveBeenNthCalledWith(2, 'o', 1, values)
      expect(iteratee).toHaveBeenNthCalledWith(3, 'o', 2, values)
      expect(result).toEqual('foo')
    })
  })

  describe('Object', () => {
    test('calls iteratee with key', () => {
      const object = {
        baz: 'bam',
        bim: 'bop',
        foo: 'bar'
      }
      const iteratee = jest.fn((identity) => identity)
      const result = map(iteratee, object)
      expect(iteratee).toHaveBeenNthCalledWith(1, 'bam', 'baz', object)
      expect(iteratee).toHaveBeenNthCalledWith(2, 'bop', 'bim', object)
      expect(iteratee).toHaveBeenNthCalledWith(3, 'bar', 'foo', object)
      expect(result).toEqual({
        baz: 'bam',
        bim: 'bop',
        foo: 'bar'
      })
    })

    test('maps over objects symbols', () => {
      const symA = Symbol('a')
      const symB = Symbol.for('b')
      const object = {
        [symA]: 'a',
        [symB]: 'b'
      }
      const iteratee = jest.fn((value) => value)
      const result = map(iteratee, object)
      expect(iteratee).toHaveBeenNthCalledWith(1, 'a', symA, object)
      expect(iteratee).toHaveBeenNthCalledWith(2, 'b', symB, object)
      expect(result).toEqual({
        [symA]: 'a',
        [symB]: 'b'
      })
    })
  })

  describe('ImmutableList', () => {
    test('maps ImmutableList left to right', () => {
      const values = ImmutableList(['foo', 'bar', 'baz'])
      const result = map((value) => value + '1', values)
      expect(result).toEqual(ImmutableList(['foo1', 'bar1', 'baz1']))
    })

    test('calls iteratee with index and value when mapping over array', () => {
      const values = ImmutableList(['foo', 'bar', 'baz'])
      const iteratee = jest.fn((identity) => identity)
      const result = map(iteratee, values)
      expect(iteratee).toHaveBeenNthCalledWith(1, 'foo', 0, values)
      expect(iteratee).toHaveBeenNthCalledWith(2, 'bar', 1, values)
      expect(iteratee).toHaveBeenNthCalledWith(3, 'baz', 2, values)
      expect(result).toEqual(ImmutableList(['foo', 'bar', 'baz']))
    })

    test('upgrades to a Promise when an async iteratee is used', async () => {
      const values = ImmutableList(['a', 'b', 'c'])
      let result = map(
        (val, index) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([val, index])
            }, 0)
          }),
        values
      )

      expect(result).toBeInstanceOf(Promise)
      result = await result
      expect(result).toEqual(
        ImmutableList([
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ])
      )
    })

    test('upgrades to a Promise when an async iteratee is used', async () => {
      const values = ImmutableList(['a', 'b', 'c'])
      let result = map(
        (val, index) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([val, index])
            }, 0)
          }),
        values
      )

      expect(result).toBeInstanceOf(Promise)
      result = await result
      expect(result).toEqual(
        ImmutableList([
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ])
      )
    })
  })
})
