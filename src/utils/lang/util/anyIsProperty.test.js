import { Index, Key, Property } from '../classes'

import anyIsProperty from './anyIsProperty'

describe('anyIsProperty', () => {
  test('returns true for plain prop', () => {
    expect(anyIsProperty('foo')).toBe(true)
    expect(anyIsProperty('bar-')).toBe(true)
    expect(anyIsProperty('bar1')).toBe(true)
    expect(anyIsProperty('1bar')).toBe(true)
  })

  test('returns true for numeric strings', () => {
    expect(anyIsProperty('123')).toBe(true)
    expect(anyIsProperty('-123')).toBe(true)
    expect(anyIsProperty('0')).toBe(true)
  })

  test('returns true for Symbols', () => {
    expect(anyIsProperty(Symbol('abc'))).toBe(true)
    expect(anyIsProperty(Symbol.for('foo'))).toBe(true)
  })

  test('returns true for plain prop String objects', () => {
    expect(anyIsProperty(new String('foo'))).toBe(true)
    expect(anyIsProperty(new String('bar-'))).toBe(true)
    expect(anyIsProperty(new String('bar1'))).toBe(true)
    expect(anyIsProperty(new String('1bar'))).toBe(true)
  })

  test('returns true for Property instance', () => {
    expect(anyIsProperty(new Property('foo'))).toBe(true)
  })

  test('returns false for arrays', () => {
    expect(anyIsProperty([])).toBe(false)
    expect(anyIsProperty(new Array())).toBe(false)
  })

  test('returns false for Index instance', () => {
    expect(anyIsProperty(new Index(0))).toBe(false)
  })

  test('returns false for Key instance', () => {
    expect(anyIsProperty(new Key('foo'))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsProperty(undefined)).toBe(false)
    expect(anyIsProperty(null)).toBe(false)
    expect(anyIsProperty(false)).toBe(false)
    expect(anyIsProperty(true)).toBe(false)
    expect(anyIsProperty(0)).toBe(false)
    expect(anyIsProperty(-1)).toBe(false)
    expect(anyIsProperty(1)).toBe(false)
    expect(anyIsProperty(NaN)).toBe(false)
    expect(anyIsProperty(Infinity)).toBe(false)
    expect(anyIsProperty(-Infinity)).toBe(false)
    expect(anyIsProperty(/abc/)).toBe(false)
    expect(anyIsProperty(async () => {})).toBe(false)
    expect(anyIsProperty(() => {})).toBe(false)
    expect(anyIsProperty(function () {})).toBe(false)
    expect(anyIsProperty(function* () {})).toBe(false)
    expect(anyIsProperty(new ArrayBuffer(2))).toBe(false)
    expect(anyIsProperty(new Boolean(false))).toBe(false)
    expect(anyIsProperty(new Boolean(true))).toBe(false)
    expect(anyIsProperty(new Date())).toBe(false)
    expect(anyIsProperty(new Error())).toBe(false)
    expect(anyIsProperty(new Number(-1.2))).toBe(false)
    expect(anyIsProperty(new Number(1.2))).toBe(false)
    expect(anyIsProperty(new Number(NaN))).toBe(false)
    expect(anyIsProperty(new Number(Infinity))).toBe(false)
    expect(anyIsProperty(new Number(-Infinity))).toBe(false)
    expect(anyIsProperty(new Promise(() => {}))).toBe(false)
    expect(anyIsProperty(new Proxy({}, {}))).toBe(false)
    expect(anyIsProperty(new WeakMap())).toBe(false)
    expect(anyIsProperty(new WeakSet())).toBe(false)
  })
})
