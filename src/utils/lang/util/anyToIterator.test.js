import { ITERATOR } from '../constants/Symbol'

import anyToIterator from './anyToIterator'
import arrayLikeToIterator from './arrayLikeToIterator'
import objectToIterator from './objectToIterator'

describe('anyToIterator', () => {
  test('returns iterator for string that iterates through the characters', () => {
    const iter = anyToIterator('abc')
    expect(iter.next()).toEqual({
      done: false,
      index: 0,
      kdx: 0,
      prev: undefined,
      value: 'a'
    })
    expect(iter.next()).toEqual({
      done: false,
      index: 1,
      kdx: 1,
      prev: {
        done: false,
        index: 0,
        kdx: 0,
        value: 'a'
      },
      value: 'b'
    })
    expect(iter.next()).toEqual({
      done: false,
      index: 2,
      kdx: 2,
      prev: {
        done: false,
        index: 1,
        kdx: 1,
        value: 'b'
      },
      value: 'c'
    })
    expect(iter.next()).toEqual({
      done: true,
      prev: {
        done: false,
        index: 2,
        kdx: 2,
        value: 'c'
      },
      value: undefined
    })
  })

  test('returns iterator for Array that iterates through the values', () => {
    const iter = anyToIterator(['abc', 'foo', 'bar'])
    expect(iter.next()).toEqual({
      done: false,
      index: 0,
      kdx: 0,
      prev: undefined,
      value: 'abc'
    })
    expect(iter.next()).toEqual({
      done: false,
      index: 1,
      kdx: 1,
      prev: {
        done: false,
        index: 0,
        kdx: 0,
        value: 'abc'
      },
      value: 'foo'
    })
    expect(iter.next()).toEqual({
      done: false,
      index: 2,
      kdx: 2,
      prev: {
        done: false,
        index: 1,
        kdx: 1,
        value: 'foo'
      },
      value: 'bar'
    })
    expect(iter.next()).toEqual({
      done: true,
      prev: {
        done: false,
        index: 2,
        kdx: 2,
        value: 'bar'
      },
      value: undefined
    })
  })

  test('returns iterator for object that iterates through the values and keys', () => {
    const iter = anyToIterator({
      abc: 'def',
      bim: 'bop',
      foo: 'bar'
    })
    expect(iter.next()).toEqual({
      done: false,
      kdx: 'abc',
      key: 'abc',
      prev: undefined,
      value: 'def'
    })
    expect(iter.next()).toEqual({
      done: false,
      kdx: 'bim',
      key: 'bim',
      prev: {
        done: false,
        kdx: 'abc',
        key: 'abc',
        value: 'def'
      },
      value: 'bop'
    })
    expect(iter.next()).toEqual({
      done: false,
      kdx: 'foo',
      key: 'foo',
      prev: {
        done: false,
        kdx: 'bim',
        key: 'bim',
        value: 'bop'
      },
      value: 'bar'
    })
    expect(iter.next()).toEqual({
      done: true,
      prev: {
        done: false,
        kdx: 'foo',
        key: 'foo',
        value: 'bar'
      },
      value: undefined
    })
  })

  test('returns iterator from iterable value by calling iterator symbol', () => {
    const iter = {
      next: () => {}
    }
    const iterable = {
      [ITERATOR]: () => iter
    }
    const result = anyToIterator(iterable)
    expect(result).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function),
      resolver: true
    })
  })

  test('returns an iterator resolver if the value is already an Iterator', () => {
    const iter = {
      next: () => {}
    }
    const result = anyToIterator(iter)
    expect(result).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function),
      resolver: true
    })
  })

  test('returns the same iterator if the iterator is an IndexedIterator', () => {
    const iter = arrayLikeToIterator([])
    const result = anyToIterator(iter)
    expect(result).toBe(iter)
  })

  test('returns the same iterator if the iterator is a KeyedIterator', () => {
    const iter = objectToIterator({})
    const result = anyToIterator(iter)
    expect(result).toBe(iter)
  })
})
