describe('toStringTag', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('converts undefined to the undefined tag', () => {
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(undefined)).toBe('[object Undefined]')
    expect(toStringTag(null)).toBe('[object Null]')
    expect(toStringTag('')).toBe('[object String]')
    expect(toStringTag('abc')).toBe('[object String]')
    expect(toStringTag(false)).toBe('[object Boolean]')
    expect(toStringTag(true)).toBe('[object Boolean]')
    expect(toStringTag(0)).toBe('[object Number]')
    expect(toStringTag(-1)).toBe('[object Number]')
    expect(toStringTag(1)).toBe('[object Number]')
    expect(toStringTag(NaN)).toBe('[object Number]')
    expect(toStringTag(Infinity)).toBe('[object Number]')
    expect(toStringTag(-Infinity)).toBe('[object Number]')
    expect(toStringTag([])).toBe('[object Array]')
    expect(toStringTag(new Array(0))).toBe('[object Array]')
    expect(toStringTag([0])).toBe('[object Array]')
    expect(toStringTag({})).toBe('[object Object]')
    expect(toStringTag(/abc/)).toBe('[object RegExp]')

    // NOTE BRN: This currently does not work because of this bug in babel https://github.com/babel/babel/issues/8642
    // expect(toStringTag(async () => {})).toBe('[object AsyncFunction]')
    // expect(toStringTag(async function() {})).toBe('[object AsyncFunction]')
    expect(toStringTag(() => {})).toBe('[object Function]')
    expect(toStringTag(function() {})).toBe('[object Function]')
    expect(toStringTag(function*() {})).toBe('[object GeneratorFunction]')
    expect(toStringTag((function*() {})())).toBe('[object Generator]')
    expect(toStringTag(new ArrayBuffer(2))).toBe('[object ArrayBuffer]')
    expect(toStringTag(new Boolean(false))).toBe('[object Boolean]')
    expect(toStringTag(new Boolean(true))).toBe('[object Boolean]')
    expect(toStringTag(new Date())).toBe('[object Date]')
    expect(toStringTag(new Error())).toBe('[object Error]')
    expect(toStringTag(new Map())).toBe('[object Map]')
    expect(toStringTag(new Number(1))).toBe('[object Number]')
    expect(toStringTag(new Promise(() => {}))).toBe('[object Promise]')
    expect(toStringTag(new Set())).toBe('[object Set]')
    expect(toStringTag(new String('abc'))).toBe('[object String]')
    expect(toStringTag(Symbol('abc'))).toBe('[object Symbol]')
    expect(toStringTag(Symbol.for('def'))).toBe('[object Symbol]')
    expect(toStringTag(new WeakMap())).toBe('[object WeakMap]')
    expect(toStringTag(new WeakSet())).toBe('[object WeakSet]')
  })

  test('converts undefined to the undefined tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof DataView) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(undefined)).toBe('[object Undefined]')
  })

  test('converts DataView instance to the DataView tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof DataView) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new DataView(new ArrayBuffer(1)))).toBe('[object DataView]')
  })

  test('converts Map instance to the Map tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof Map) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new Map())).toBe('[object Map]')
  })

  test('converts Promise instance to the Promise tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof Promise) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new Promise(() => {}))).toBe('[object Promise]')
  })

  test('converts Set instance to the Set tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof Set) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new Set())).toBe('[object Set]')
  })

  test('converts WeakMap instance to the WeakMap tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof WeakMap) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new WeakMap())).toBe('[object WeakMap]')
  })
})
