import isKey from './isKey'

describe('isKey', () => {
  test('returns true for primitive strings', () => {
    expect(isKey('foo')).toBe(true)
    expect(isKey('bar-')).toBe(true)
    expect(isKey('bar1')).toBe(true)
    expect(isKey('1bar')).toBe(true)
    expect(isKey('123')).toBe(true)
    expect(isKey('-123')).toBe(true)
    expect(isKey('0')).toBe(true)
  })

  test('returns true for Symbols', () => {
    expect(isKey(Symbol('abc'))).toBe(true)
    expect(isKey(Symbol.for('foo'))).toBe(true)
  })

  test('returns true for String objects', () => {
    expect(isKey(new String('foo'))).toBe(true)
    expect(isKey(new String('bar-'))).toBe(true)
    expect(isKey(new String('bar1'))).toBe(true)
    expect(isKey(new String('1bar'))).toBe(true)
    expect(isKey(new String('123'))).toBe(true)
    expect(isKey(new String('-123'))).toBe(true)
    expect(isKey(new String('0'))).toBe(true)
  })

  test('returns true for arrays', () => {
    expect(isKey([])).toBe(true)
    expect(isKey(new Array())).toBe(true)
  })

  test('returns true for paths', () => {
    expect(isKey('foo.bar')).toBe(true)
    expect(isKey('foo[1]')).toBe(true)
    expect(isKey("foo['abc']")).toBe(true)
  })

  test('returns true for all other values', () => {
    expect(isKey(undefined)).toBe(true)
    expect(isKey(null)).toBe(true)
    expect(isKey(false)).toBe(true)
    expect(isKey(true)).toBe(true)
    expect(isKey(0)).toBe(true)
    expect(isKey(-1)).toBe(true)
    expect(isKey(1)).toBe(true)
    expect(isKey(NaN)).toBe(true)
    expect(isKey(Infinity)).toBe(true)
    expect(isKey(-Infinity)).toBe(true)
    expect(isKey(/abc/)).toBe(true)
    expect(isKey(async () => {})).toBe(true)
    expect(isKey(() => {})).toBe(true)
    expect(isKey(function () {})).toBe(true)
    expect(isKey(function* () {})).toBe(true)
    expect(isKey(new ArrayBuffer(2))).toBe(true)
    expect(isKey(new Boolean(false))).toBe(true)
    expect(isKey(new Boolean(true))).toBe(true)
    expect(isKey(new Date())).toBe(true)
    expect(isKey(new Error())).toBe(true)
    expect(isKey(new Number(-1.2))).toBe(true)
    expect(isKey(new Number(1.2))).toBe(true)
    expect(isKey(new Number(NaN))).toBe(true)
    expect(isKey(new Number(Infinity))).toBe(true)
    expect(isKey(new Number(-Infinity))).toBe(true)
    expect(isKey(new Promise(() => {}))).toBe(true)
    expect(isKey(new Proxy({}, {}))).toBe(true)
    expect(isKey(new WeakMap())).toBe(true)
    expect(isKey(new WeakSet())).toBe(true)
  })
})
