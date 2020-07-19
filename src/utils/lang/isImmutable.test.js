import Immutable from 'immutable'

import isImmutable from './isImmutable'

describe('isImmutable', () => {
  test('Returns true for an Immutable Map', () => {
    expect(isImmutable(Immutable.Map())).toBe(true)
  })

  test('Returns true for an Immutable Set', () => {
    expect(isImmutable(Immutable.Set())).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isImmutable(undefined)).toBe(false)
    expect(isImmutable(null)).toBe(false)
    expect(isImmutable('')).toBe(false)
    expect(isImmutable('abc')).toBe(false)
    expect(isImmutable(false)).toBe(false)
    expect(isImmutable(true)).toBe(false)
    expect(isImmutable(0)).toBe(false)
    expect(isImmutable(-1)).toBe(false)
    expect(isImmutable(1)).toBe(false)
    expect(isImmutable(NaN)).toBe(false)
    expect(isImmutable(Infinity)).toBe(false)
    expect(isImmutable(-Infinity)).toBe(false)
    expect(isImmutable([])).toBe(false)
    expect(isImmutable(new Array(0))).toBe(false)
    expect(isImmutable([0])).toBe(false)
    expect(isImmutable({})).toBe(false)
    expect(isImmutable(/abc/)).toBe(false)
    expect(isImmutable(async () => {})).toBe(false)
    expect(isImmutable(() => {})).toBe(false)
    expect(isImmutable(function () {})).toBe(false)
    expect(isImmutable((function* () {})())).toBe(false)
    expect(isImmutable(new ArrayBuffer(2))).toBe(false)
    expect(isImmutable(new Boolean(false))).toBe(false)
    expect(isImmutable(new Boolean(true))).toBe(false)
    expect(isImmutable(new Date())).toBe(false)
    expect(isImmutable(new Error())).toBe(false)
    expect(isImmutable(new Map())).toBe(false)
    expect(isImmutable(new Number(1))).toBe(false)
    expect(isImmutable(new Promise(() => {}))).toBe(false)
    expect(isImmutable(new Proxy({}, {}))).toBe(false)
    expect(isImmutable(new Set())).toBe(false)
    expect(isImmutable(new String('abc'))).toBe(false)
    expect(isImmutable(Symbol('abc'))).toBe(false)
    expect(isImmutable(Symbol.for('def'))).toBe(false)
    expect(isImmutable(new WeakMap())).toBe(false)
    expect(isImmutable(new WeakSet())).toBe(false)
  })
})
