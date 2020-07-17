import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsImmutableMap from './anyIsImmutableMap'

describe('anyIsImmutableMap', () => {
  test('Returns true for an ImmutableMap', () => {
    expect(anyIsImmutableMap(ImmutableMap())).toBe(true)
  })

  test('Returns true for an ImmutableOrderedMap', () => {
    expect(anyIsImmutableMap(ImmutableOrderedMap())).toBe(true)
  })

  test('Returns false for an ImmutableList', () => {
    expect(anyIsImmutableMap(ImmutableList())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedSet', () => {
    expect(anyIsImmutableMap(ImmutableOrderedSet())).toBe(false)
  })

  test('Returns false for an ImmutableSet', () => {
    expect(anyIsImmutableMap(ImmutableSet())).toBe(false)
  })

  test('Returns false for an ImmutableStack', () => {
    expect(anyIsImmutableMap(ImmutableStack())).toBe(false)
  })

  test('Returns false for a Seq', () => {
    expect(anyIsImmutableMap(Seq([]))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutableMap(undefined)).toBe(false)
    expect(anyIsImmutableMap(null)).toBe(false)
    expect(anyIsImmutableMap('')).toBe(false)
    expect(anyIsImmutableMap('abc')).toBe(false)
    expect(anyIsImmutableMap(false)).toBe(false)
    expect(anyIsImmutableMap(true)).toBe(false)
    expect(anyIsImmutableMap(0)).toBe(false)
    expect(anyIsImmutableMap(-1)).toBe(false)
    expect(anyIsImmutableMap(1)).toBe(false)
    expect(anyIsImmutableMap(NaN)).toBe(false)
    expect(anyIsImmutableMap(Infinity)).toBe(false)
    expect(anyIsImmutableMap(-Infinity)).toBe(false)
    expect(anyIsImmutableMap([])).toBe(false)
    expect(anyIsImmutableMap(new Array(0))).toBe(false)
    expect(anyIsImmutableMap([0])).toBe(false)
    expect(anyIsImmutableMap({})).toBe(false)
    expect(anyIsImmutableMap(/abc/)).toBe(false)
    expect(anyIsImmutableMap(async () => {})).toBe(false)
    expect(anyIsImmutableMap(() => {})).toBe(false)
    expect(anyIsImmutableMap(function () {})).toBe(false)
    expect(anyIsImmutableMap((function* () {})())).toBe(false)
    expect(anyIsImmutableMap(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutableMap(new Boolean(false))).toBe(false)
    expect(anyIsImmutableMap(new Boolean(true))).toBe(false)
    expect(anyIsImmutableMap(new Date())).toBe(false)
    expect(anyIsImmutableMap(new Error())).toBe(false)
    expect(anyIsImmutableMap(new Map())).toBe(false)
    expect(anyIsImmutableMap(new Number(1))).toBe(false)
    expect(anyIsImmutableMap(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutableMap(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutableMap(new Set())).toBe(false)
    expect(anyIsImmutableMap(new String('abc'))).toBe(false)
    expect(anyIsImmutableMap(Symbol('abc'))).toBe(false)
    expect(anyIsImmutableMap(Symbol.for('def'))).toBe(false)
    expect(anyIsImmutableMap(new WeakMap())).toBe(false)
    expect(anyIsImmutableMap(new WeakSet())).toBe(false)
  })
})
