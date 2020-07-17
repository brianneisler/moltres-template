import anyIsArguments from './anyIsArguments'

describe('anyIsArguments', () => {
  test('identifies arguments from functions', async () => {
    // NOTE BRN: arrow functions do not have an arguments variable
    expect(function () {
      expect(anyIsArguments(arguments)).toBe(true)
    }).not.toThrow()

    await (async function () {
      expect(anyIsArguments(arguments)).toBe(true)
    })()

    const generator = (function* () {
      expect(anyIsArguments(arguments)).toBe(true)
    })()
    generator.next()
  })

  test('returns false for all other values', () => {
    expect(anyIsArguments(undefined)).toBe(false)
    expect(anyIsArguments(null)).toBe(false)
    expect(anyIsArguments('')).toBe(false)
    expect(anyIsArguments('abc')).toBe(false)
    expect(anyIsArguments(false)).toBe(false)
    expect(anyIsArguments(true)).toBe(false)
    expect(anyIsArguments(0)).toBe(false)
    expect(anyIsArguments(-1)).toBe(false)
    expect(anyIsArguments(1)).toBe(false)
    expect(anyIsArguments(NaN)).toBe(false)
    expect(anyIsArguments(Infinity)).toBe(false)
    expect(anyIsArguments(-Infinity)).toBe(false)
    expect(anyIsArguments({})).toBe(false)
    expect(anyIsArguments([])).toBe(false)
    expect(anyIsArguments(/abc/)).toBe(false)
    expect(anyIsArguments(async () => {})).toBe(false)
    expect(anyIsArguments(() => {})).toBe(false)
    expect(anyIsArguments(function () {})).toBe(false)
    expect(anyIsArguments(function* () {})).toBe(false)
    expect(anyIsArguments((function* () {})())).toBe(false)
    expect(anyIsArguments(new Array(0))).toBe(false)
    expect(anyIsArguments(new ArrayBuffer(2))).toBe(false)
    expect(anyIsArguments(new Boolean(false))).toBe(false)
    expect(anyIsArguments(new Boolean(true))).toBe(false)
    expect(anyIsArguments(new Date())).toBe(false)
    expect(anyIsArguments(new Error())).toBe(false)
    expect(anyIsArguments(new Number(1))).toBe(false)
    expect(anyIsArguments(new Promise(() => {}))).toBe(false)
    expect(anyIsArguments(new Proxy({}, {}))).toBe(false)
    expect(anyIsArguments(new Set())).toBe(false)
    expect(anyIsArguments(new String('abc'))).toBe(false)
    expect(anyIsArguments(Symbol('abc'))).toBe(false)
    expect(anyIsArguments(new WeakMap())).toBe(false)
    expect(anyIsArguments(new WeakSet())).toBe(false)
  })
})
