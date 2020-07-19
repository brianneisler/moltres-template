import { Index, Key, Property } from '../classes'

import anyIsKey from './anyIsKey'

describe('anyIsKey', () => {
  test('returns true for primitive strings', () => {
    expect(anyIsKey('foo')).toBe(true)
    expect(anyIsKey('bar-')).toBe(true)
    expect(anyIsKey('bar1')).toBe(true)
    expect(anyIsKey('1bar')).toBe(true)
    expect(anyIsKey('123')).toBe(true)
    expect(anyIsKey('-123')).toBe(true)
    expect(anyIsKey('0')).toBe(true)
  })

  test('returns true for Symbols', () => {
    expect(anyIsKey(Symbol('abc'))).toBe(true)
    expect(anyIsKey(Symbol.for('foo'))).toBe(true)
  })

  test('returns true for String objects', () => {
    expect(anyIsKey(new String('foo'))).toBe(true)
    expect(anyIsKey(new String('bar-'))).toBe(true)
    expect(anyIsKey(new String('bar1'))).toBe(true)
    expect(anyIsKey(new String('1bar'))).toBe(true)
    expect(anyIsKey(new String('123'))).toBe(true)
    expect(anyIsKey(new String('-123'))).toBe(true)
    expect(anyIsKey(new String('0'))).toBe(true)
  })

  test('returns true for arrays', () => {
    expect(anyIsKey([])).toBe(true)
    expect(anyIsKey(new Array())).toBe(true)
  })

  test('returns true for Key instance', () => {
    expect(anyIsKey(new Key('foo'))).toBe(true)
  })

  test('returns true for all other values', () => {
    expect(anyIsKey(undefined)).toBe(true)
    expect(anyIsKey(null)).toBe(true)
    expect(anyIsKey(false)).toBe(true)
    expect(anyIsKey(true)).toBe(true)
    expect(anyIsKey(0)).toBe(true)
    expect(anyIsKey(-1)).toBe(true)
    expect(anyIsKey(1)).toBe(true)
    expect(anyIsKey(NaN)).toBe(true)
    expect(anyIsKey(Infinity)).toBe(true)
    expect(anyIsKey(-Infinity)).toBe(true)
    expect(anyIsKey(/abc/)).toBe(true)
    expect(anyIsKey(async () => {})).toBe(true)
    expect(anyIsKey(() => {})).toBe(true)
    expect(anyIsKey(function () {})).toBe(true)
    expect(anyIsKey(function* () {})).toBe(true)
    expect(anyIsKey(new ArrayBuffer(2))).toBe(true)
    expect(anyIsKey(new Boolean(false))).toBe(true)
    expect(anyIsKey(new Boolean(true))).toBe(true)
    expect(anyIsKey(new Date())).toBe(true)
    expect(anyIsKey(new Error())).toBe(true)
    expect(anyIsKey(new Number(-1.2))).toBe(true)
    expect(anyIsKey(new Number(1.2))).toBe(true)
    expect(anyIsKey(new Number(NaN))).toBe(true)
    expect(anyIsKey(new Number(Infinity))).toBe(true)
    expect(anyIsKey(new Number(-Infinity))).toBe(true)
    expect(anyIsKey(new Promise(() => {}))).toBe(true)
    expect(anyIsKey(new Proxy({}, {}))).toBe(true)
    expect(anyIsKey(new WeakMap())).toBe(true)
    expect(anyIsKey(new WeakSet())).toBe(true)
  })

  test('returns false for Index instance', () => {
    expect(anyIsKey(new Index(0))).toBe(false)
  })

  test('returns false for Property instance', () => {
    expect(anyIsKey(new Property('foo'))).toBe(false)
  })
})
