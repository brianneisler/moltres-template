import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsImmutableStack from './anyIsImmutableStack'

describe('anyIsImmutableStack', () => {
  test('Returns true for an ImmutableStack', () => {
    expect(anyIsImmutableStack(ImmutableStack())).toBe(true)
  })

  test('Returns false for an ImmutableList', () => {
    expect(anyIsImmutableStack(ImmutableList())).toBe(false)
  })

  test('Returns false for an ImmutableMap', () => {
    expect(anyIsImmutableStack(ImmutableMap())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedMap', () => {
    expect(anyIsImmutableStack(ImmutableOrderedMap())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedSet', () => {
    expect(anyIsImmutableStack(ImmutableOrderedSet())).toBe(false)
  })

  test('Returns false for an ImmutableSet', () => {
    expect(anyIsImmutableStack(ImmutableSet())).toBe(false)
  })

  test('Returns false for a Seq', () => {
    expect(anyIsImmutableStack(Seq([]))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutableStack(undefined)).toBe(false)
    expect(anyIsImmutableStack(null)).toBe(false)
    expect(anyIsImmutableStack('')).toBe(false)
    expect(anyIsImmutableStack('abc')).toBe(false)
    expect(anyIsImmutableStack(false)).toBe(false)
    expect(anyIsImmutableStack(true)).toBe(false)
    expect(anyIsImmutableStack(0)).toBe(false)
    expect(anyIsImmutableStack(-1)).toBe(false)
    expect(anyIsImmutableStack(1)).toBe(false)
    expect(anyIsImmutableStack(NaN)).toBe(false)
    expect(anyIsImmutableStack(Infinity)).toBe(false)
    expect(anyIsImmutableStack(-Infinity)).toBe(false)
    expect(anyIsImmutableStack([])).toBe(false)
    expect(anyIsImmutableStack(new Array(0))).toBe(false)
    expect(anyIsImmutableStack([0])).toBe(false)
    expect(anyIsImmutableStack({})).toBe(false)
    expect(anyIsImmutableStack(/abc/)).toBe(false)
    expect(anyIsImmutableStack(async () => {})).toBe(false)
    expect(anyIsImmutableStack(() => {})).toBe(false)
    expect(anyIsImmutableStack(function () {})).toBe(false)
    expect(anyIsImmutableStack((function* () {})())).toBe(false)
    expect(anyIsImmutableStack(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutableStack(new Boolean(false))).toBe(false)
    expect(anyIsImmutableStack(new Boolean(true))).toBe(false)
    expect(anyIsImmutableStack(new Date())).toBe(false)
    expect(anyIsImmutableStack(new Error())).toBe(false)
    expect(anyIsImmutableStack(new Map())).toBe(false)
    expect(anyIsImmutableStack(new Number(1))).toBe(false)
    expect(anyIsImmutableStack(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutableStack(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutableStack(new Set())).toBe(false)
    expect(anyIsImmutableStack(new String('abc'))).toBe(false)
    expect(anyIsImmutableStack(Symbol('abc'))).toBe(false)
    expect(anyIsImmutableStack(Symbol.for('def'))).toBe(false)
    expect(anyIsImmutableStack(new WeakMap())).toBe(false)
    expect(anyIsImmutableStack(new WeakSet())).toBe(false)
  })
})
