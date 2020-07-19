import { ITERATOR } from '../constants/Symbol'

import anyIsKeyedIterator from './anyIsKeyedIterator'
import objectToIterator from './objectToIterator'

describe('isKeyedIterator', () => {
  test('returns true for objectToIterator', () => {
    expect(anyIsKeyedIterator(objectToIterator({}))).toBe(true)
  })

  test('returns true for object with next and getKey method', () => {
    expect(
      anyIsKeyedIterator({
        getKey: () => {},
        next: () => ({
          done: true
        })
      })
    ).toBe(true)
  })

  test('returns false for native array iterator', () => {
    const array = []
    expect(anyIsKeyedIterator(array[ITERATOR]())).toBe(false)
  })

  test('returns false for native string iterator', () => {
    const string = 'abc'
    expect(anyIsKeyedIterator(string[ITERATOR]())).toBe(false)
  })

  test('returns false for generators', () => {
    expect(anyIsKeyedIterator((function* () {})())).toBe(false)
  })

  test('returns false for native Set iterator', () => {
    const set = new Set()
    expect(anyIsKeyedIterator(set[ITERATOR]())).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsKeyedIterator(undefined)).toBe(false)
    expect(anyIsKeyedIterator(null)).toBe(false)
    expect(anyIsKeyedIterator(false)).toBe(false)
    expect(anyIsKeyedIterator(true)).toBe(false)
    expect(anyIsKeyedIterator(0)).toBe(false)
    expect(anyIsKeyedIterator(-1)).toBe(false)
    expect(anyIsKeyedIterator(1)).toBe(false)
    expect(anyIsKeyedIterator(NaN)).toBe(false)
    expect(anyIsKeyedIterator(Infinity)).toBe(false)
    expect(anyIsKeyedIterator(-Infinity)).toBe(false)
    expect(anyIsKeyedIterator(/abc/)).toBe(false)
    expect(anyIsKeyedIterator(async () => {})).toBe(false)
    expect(anyIsKeyedIterator(() => {})).toBe(false)
    expect(anyIsKeyedIterator(function () {})).toBe(false)
    expect(anyIsKeyedIterator(function* () {})).toBe(false)
    expect(anyIsKeyedIterator(new ArrayBuffer(2))).toBe(false)
    expect(anyIsKeyedIterator(new Boolean(false))).toBe(false)
    expect(anyIsKeyedIterator(new Boolean(true))).toBe(false)
    expect(anyIsKeyedIterator(new Date())).toBe(false)
    expect(anyIsKeyedIterator(new Error())).toBe(false)
    expect(anyIsKeyedIterator(new Number(-1.2))).toBe(false)
    expect(anyIsKeyedIterator(new Number(1.2))).toBe(false)
    expect(anyIsKeyedIterator(new Number(NaN))).toBe(false)
    expect(anyIsKeyedIterator(new Number(Infinity))).toBe(false)
    expect(anyIsKeyedIterator(new Number(-Infinity))).toBe(false)
    expect(anyIsKeyedIterator(new Promise(() => {}))).toBe(false)
    expect(anyIsKeyedIterator(new Proxy({}, {}))).toBe(false)
    expect(anyIsKeyedIterator(Symbol('abc'))).toBe(false)
    expect(anyIsKeyedIterator(new WeakMap())).toBe(false)
    expect(anyIsKeyedIterator(new WeakSet())).toBe(false)
  })
})
