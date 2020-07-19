import { ITERATOR } from '../constants/Symbol'

import anyIsIndexedIterator from './anyIsIndexedIterator'
import arrayLikeToIterator from './arrayLikeToIterator'
import objectToIterator from './objectToIterator'

describe('anyIsIndexedIterator', () => {
  test('returns true for arrayLikeToIterator', () => {
    expect(anyIsIndexedIterator(arrayLikeToIterator([]))).toBe(true)
  })

  test('returns true for object with next and getIndex method', () => {
    expect(
      anyIsIndexedIterator({
        getIndex: () => {},
        next: () => ({
          done: true
        })
      })
    ).toBe(true)
  })

  test('returns false for native array iterator', () => {
    const array = []
    expect(anyIsIndexedIterator(array[ITERATOR]())).toBe(false)
  })

  test('returns false for native string iterator', () => {
    const string = 'abc'
    expect(anyIsIndexedIterator(string[ITERATOR]())).toBe(false)
  })

  test('returns false for generators', () => {
    expect(anyIsIndexedIterator((function* () {})())).toBe(false)
  })

  test('returns false for native Set iterator', () => {
    const set = new Set()
    expect(anyIsIndexedIterator(set[ITERATOR]())).toBe(false)
  })

  test('returns true false for objectToIterator', () => {
    expect(anyIsIndexedIterator(objectToIterator({}))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsIndexedIterator(undefined)).toBe(false)
    expect(anyIsIndexedIterator(null)).toBe(false)
    expect(anyIsIndexedIterator(false)).toBe(false)
    expect(anyIsIndexedIterator(true)).toBe(false)
    expect(anyIsIndexedIterator(0)).toBe(false)
    expect(anyIsIndexedIterator(-1)).toBe(false)
    expect(anyIsIndexedIterator(1)).toBe(false)
    expect(anyIsIndexedIterator(NaN)).toBe(false)
    expect(anyIsIndexedIterator(Infinity)).toBe(false)
    expect(anyIsIndexedIterator(-Infinity)).toBe(false)
    expect(anyIsIndexedIterator(/abc/)).toBe(false)
    expect(anyIsIndexedIterator(async () => {})).toBe(false)
    expect(anyIsIndexedIterator(() => {})).toBe(false)
    expect(anyIsIndexedIterator(function () {})).toBe(false)
    expect(anyIsIndexedIterator(function* () {})).toBe(false)
    expect(anyIsIndexedIterator(new ArrayBuffer(2))).toBe(false)
    expect(anyIsIndexedIterator(new Boolean(false))).toBe(false)
    expect(anyIsIndexedIterator(new Boolean(true))).toBe(false)
    expect(anyIsIndexedIterator(new Date())).toBe(false)
    expect(anyIsIndexedIterator(new Error())).toBe(false)
    expect(anyIsIndexedIterator(new Number(-1.2))).toBe(false)
    expect(anyIsIndexedIterator(new Number(1.2))).toBe(false)
    expect(anyIsIndexedIterator(new Number(NaN))).toBe(false)
    expect(anyIsIndexedIterator(new Number(Infinity))).toBe(false)
    expect(anyIsIndexedIterator(new Number(-Infinity))).toBe(false)
    expect(anyIsIndexedIterator(new Promise(() => {}))).toBe(false)
    expect(anyIsIndexedIterator(new Proxy({}, {}))).toBe(false)
    expect(anyIsIndexedIterator(Symbol('abc'))).toBe(false)
    expect(anyIsIndexedIterator(new WeakMap())).toBe(false)
    expect(anyIsIndexedIterator(new WeakSet())).toBe(false)
  })
})
