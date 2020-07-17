import { ITERATOR } from '../constants/Symbol'

import anyIsIterator from './anyIsIterator'

describe('anyIsIterator', () => {
  test('returns true for array iterator', () => {
    const array = []
    expect(anyIsIterator(array[ITERATOR]())).toBe(true)
  })

  test('returns true for string iterator', () => {
    const string = 'abc'
    expect(anyIsIterator(string[ITERATOR]())).toBe(true)
  })

  test('returns true for generators', () => {
    expect(anyIsIterator((function* () {})())).toBe(true)
  })

  test('returns true for Set', () => {
    const set = new Set()
    expect(anyIsIterator(set[ITERATOR]())).toBe(true)
  })

  test('returns true for object with next method', () => {
    expect(
      anyIsIterator({
        next: () => ({
          done: true
        })
      })
    ).toBe(true)
  })

  test('returns true for async iterator', () => {
    expect(
      anyIsIterator({
        next: async () => ({
          done: true
        })
      })
    ).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsIterator(undefined)).toBe(false)
    expect(anyIsIterator(null)).toBe(false)
    expect(anyIsIterator(false)).toBe(false)
    expect(anyIsIterator(true)).toBe(false)
    expect(anyIsIterator(0)).toBe(false)
    expect(anyIsIterator(-1)).toBe(false)
    expect(anyIsIterator(1)).toBe(false)
    expect(anyIsIterator(NaN)).toBe(false)
    expect(anyIsIterator(Infinity)).toBe(false)
    expect(anyIsIterator(-Infinity)).toBe(false)
    expect(anyIsIterator(/abc/)).toBe(false)
    expect(anyIsIterator(async () => {})).toBe(false)
    expect(anyIsIterator(() => {})).toBe(false)
    expect(anyIsIterator(function () {})).toBe(false)
    expect(anyIsIterator(function* () {})).toBe(false)
    expect(anyIsIterator(new ArrayBuffer(2))).toBe(false)
    expect(anyIsIterator(new Boolean(false))).toBe(false)
    expect(anyIsIterator(new Boolean(true))).toBe(false)
    expect(anyIsIterator(new Date())).toBe(false)
    expect(anyIsIterator(new Error())).toBe(false)
    expect(anyIsIterator(new Number(-1.2))).toBe(false)
    expect(anyIsIterator(new Number(1.2))).toBe(false)
    expect(anyIsIterator(new Number(NaN))).toBe(false)
    expect(anyIsIterator(new Number(Infinity))).toBe(false)
    expect(anyIsIterator(new Number(-Infinity))).toBe(false)
    expect(anyIsIterator(new Promise(() => {}))).toBe(false)
    expect(anyIsIterator(new Proxy({}, {}))).toBe(false)
    expect(anyIsIterator(Symbol('abc'))).toBe(false)
    expect(anyIsIterator(new WeakMap())).toBe(false)
    expect(anyIsIterator(new WeakSet())).toBe(false)
  })
})
