import anyIsObject from './anyIsObject'

describe('anyIsObject', () => {
  test('returns true for plain object', () => {
    expect(anyIsObject({})).toBe(true)
    expect(anyIsObject(new Object())).toBe(true)
  })

  test('returns true for complex object', () => {
    const ComplexObject = function () {}
    expect(anyIsObject(new ComplexObject())).toBe(true)
  })

  test('returns true for plain array', () => {
    expect(anyIsObject([])).toBe(true)
    expect(anyIsObject(new Array())).toBe(true)
  })

  test('returns true for functions', () => {
    expect(anyIsObject(() => {})).toBe(true)
    expect(anyIsObject(function () {})).toBe(true)
    expect(anyIsObject(async () => {})).toBe(true)
    expect(anyIsObject(async function () {})).toBe(true)
    expect(anyIsObject(function* () {})).toBe(true)
    expect(anyIsObject(new Function('a', 'b', 'return a + b'))).toBe(true)
    // TODO BRN: Check for ES6 Proxy support
  })

  test('returns true for object versions of primitive values', () => {
    expect(anyIsObject(new Boolean(false))).toBe(true)
    expect(anyIsObject(new Number(3.2))).toBe(true)
    expect(anyIsObject(new String('abc'))).toBe(true)
  })

  test('returns true for native objects', () => {
    expect(anyIsObject(new ArrayBuffer(2))).toBe(true)
    expect(anyIsObject(new Date())).toBe(true)
    expect(anyIsObject(new Error())).toBe(true)
    expect(anyIsObject(new Map())).toBe(true)
    expect(anyIsObject(new Promise(() => {}))).toBe(true)
    expect(anyIsObject(new Proxy({}, {}))).toBe(true)
    expect(anyIsObject(new Set())).toBe(true)
    expect(anyIsObject(new WeakMap())).toBe(true)
    expect(anyIsObject(new WeakSet())).toBe(true)
  })

  test('returns false for all primitive values', () => {
    expect(anyIsObject(undefined)).toBe(false)
    expect(anyIsObject(null)).toBe(false)
    expect(anyIsObject('')).toBe(false)
    expect(anyIsObject('abc')).toBe(false)
    expect(anyIsObject(false)).toBe(false)
    expect(anyIsObject(true)).toBe(false)
    expect(anyIsObject(0)).toBe(false)
    expect(anyIsObject(-1)).toBe(false)
    expect(anyIsObject(1)).toBe(false)
    expect(anyIsObject(1.23)).toBe(false)
    expect(anyIsObject(-1.23)).toBe(false)
    expect(anyIsObject(NaN)).toBe(false)
    expect(anyIsObject(Infinity)).toBe(false)
    expect(anyIsObject(-Infinity)).toBe(false)
    expect(anyIsObject(Symbol('abc'))).toBe(false)
    expect(anyIsObject(Symbol.for('foo'))).toBe(false)
  })
})
