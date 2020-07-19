import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsImmutableOrderedMap from './anyIsImmutableOrderedMap'

describe('anyIsImmutableOrderedMap', () => {
  test('Returns true for an ImmutableOrderedMap', () => {
    expect(anyIsImmutableOrderedMap(ImmutableOrderedMap())).toBe(true)
  })

  test('Returns false for an ImmutableList', () => {
    expect(anyIsImmutableOrderedMap(ImmutableList())).toBe(false)
  })

  test('Returns false for an ImmutableMap', () => {
    expect(anyIsImmutableOrderedMap(ImmutableMap())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedSet', () => {
    expect(anyIsImmutableOrderedMap(ImmutableOrderedSet())).toBe(false)
  })

  test('Returns false for an ImmutableSet', () => {
    expect(anyIsImmutableOrderedMap(ImmutableSet())).toBe(false)
  })

  test('Returns false for an ImmutableStack', () => {
    expect(anyIsImmutableOrderedMap(ImmutableStack())).toBe(false)
  })

  test('Returns false for a Seq', () => {
    expect(anyIsImmutableOrderedMap(Seq([]))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutableOrderedMap(undefined)).toBe(false)
    expect(anyIsImmutableOrderedMap(null)).toBe(false)
    expect(anyIsImmutableOrderedMap('')).toBe(false)
    expect(anyIsImmutableOrderedMap('abc')).toBe(false)
    expect(anyIsImmutableOrderedMap(false)).toBe(false)
    expect(anyIsImmutableOrderedMap(true)).toBe(false)
    expect(anyIsImmutableOrderedMap(0)).toBe(false)
    expect(anyIsImmutableOrderedMap(-1)).toBe(false)
    expect(anyIsImmutableOrderedMap(1)).toBe(false)
    expect(anyIsImmutableOrderedMap(NaN)).toBe(false)
    expect(anyIsImmutableOrderedMap(Infinity)).toBe(false)
    expect(anyIsImmutableOrderedMap(-Infinity)).toBe(false)
    expect(anyIsImmutableOrderedMap([])).toBe(false)
    expect(anyIsImmutableOrderedMap(new Array(0))).toBe(false)
    expect(anyIsImmutableOrderedMap([0])).toBe(false)
    expect(anyIsImmutableOrderedMap({})).toBe(false)
    expect(anyIsImmutableOrderedMap(/abc/)).toBe(false)
    expect(anyIsImmutableOrderedMap(async () => {})).toBe(false)
    expect(anyIsImmutableOrderedMap(() => {})).toBe(false)
    expect(anyIsImmutableOrderedMap(function () {})).toBe(false)
    expect(anyIsImmutableOrderedMap((function* () {})())).toBe(false)
    expect(anyIsImmutableOrderedMap(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutableOrderedMap(new Boolean(false))).toBe(false)
    expect(anyIsImmutableOrderedMap(new Boolean(true))).toBe(false)
    expect(anyIsImmutableOrderedMap(new Date())).toBe(false)
    expect(anyIsImmutableOrderedMap(new Error())).toBe(false)
    expect(anyIsImmutableOrderedMap(new Map())).toBe(false)
    expect(anyIsImmutableOrderedMap(new Number(1))).toBe(false)
    expect(anyIsImmutableOrderedMap(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutableOrderedMap(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutableOrderedMap(new Set())).toBe(false)
    expect(anyIsImmutableOrderedMap(new String('abc'))).toBe(false)
    expect(anyIsImmutableOrderedMap(Symbol('abc'))).toBe(false)
    expect(anyIsImmutableOrderedMap(Symbol.for('def'))).toBe(false)
    expect(anyIsImmutableOrderedMap(new WeakMap())).toBe(false)
    expect(anyIsImmutableOrderedMap(new WeakSet())).toBe(false)
  })
})
