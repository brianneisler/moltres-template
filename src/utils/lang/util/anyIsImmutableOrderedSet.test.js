import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsImmutableOrderedSet from './anyIsImmutableOrderedSet'

describe('anyIsImmutableOrderedSet', () => {
  test('Returns true for an ImmutableOrderedSet', () => {
    expect(anyIsImmutableOrderedSet(ImmutableOrderedSet())).toBe(true)
  })

  test('Returns false for an ImmutableList', () => {
    expect(anyIsImmutableOrderedSet(ImmutableList())).toBe(false)
  })

  test('Returns false for an ImmutableMap', () => {
    expect(anyIsImmutableOrderedSet(ImmutableMap())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedMap', () => {
    expect(anyIsImmutableOrderedSet(ImmutableOrderedMap())).toBe(false)
  })

  test('Returns false for an ImmutableSet', () => {
    expect(anyIsImmutableOrderedSet(ImmutableSet())).toBe(false)
  })

  test('Returns false for an ImmutableStack', () => {
    expect(anyIsImmutableOrderedSet(ImmutableStack())).toBe(false)
  })

  test('Returns false for a Seq', () => {
    expect(anyIsImmutableOrderedSet(Seq([]))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutableOrderedSet(undefined)).toBe(false)
    expect(anyIsImmutableOrderedSet(null)).toBe(false)
    expect(anyIsImmutableOrderedSet('')).toBe(false)
    expect(anyIsImmutableOrderedSet('abc')).toBe(false)
    expect(anyIsImmutableOrderedSet(false)).toBe(false)
    expect(anyIsImmutableOrderedSet(true)).toBe(false)
    expect(anyIsImmutableOrderedSet(0)).toBe(false)
    expect(anyIsImmutableOrderedSet(-1)).toBe(false)
    expect(anyIsImmutableOrderedSet(1)).toBe(false)
    expect(anyIsImmutableOrderedSet(NaN)).toBe(false)
    expect(anyIsImmutableOrderedSet(Infinity)).toBe(false)
    expect(anyIsImmutableOrderedSet(-Infinity)).toBe(false)
    expect(anyIsImmutableOrderedSet([])).toBe(false)
    expect(anyIsImmutableOrderedSet(new Array(0))).toBe(false)
    expect(anyIsImmutableOrderedSet([0])).toBe(false)
    expect(anyIsImmutableOrderedSet({})).toBe(false)
    expect(anyIsImmutableOrderedSet(/abc/)).toBe(false)
    expect(anyIsImmutableOrderedSet(async () => {})).toBe(false)
    expect(anyIsImmutableOrderedSet(() => {})).toBe(false)
    expect(anyIsImmutableOrderedSet(function () {})).toBe(false)
    expect(anyIsImmutableOrderedSet((function* () {})())).toBe(false)
    expect(anyIsImmutableOrderedSet(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutableOrderedSet(new Boolean(false))).toBe(false)
    expect(anyIsImmutableOrderedSet(new Boolean(true))).toBe(false)
    expect(anyIsImmutableOrderedSet(new Date())).toBe(false)
    expect(anyIsImmutableOrderedSet(new Error())).toBe(false)
    expect(anyIsImmutableOrderedSet(new Map())).toBe(false)
    expect(anyIsImmutableOrderedSet(new Number(1))).toBe(false)
    expect(anyIsImmutableOrderedSet(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutableOrderedSet(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutableOrderedSet(new Set())).toBe(false)
    expect(anyIsImmutableOrderedSet(new String('abc'))).toBe(false)
    expect(anyIsImmutableOrderedSet(Symbol('abc'))).toBe(false)
    expect(anyIsImmutableOrderedSet(Symbol.for('def'))).toBe(false)
    expect(anyIsImmutableOrderedSet(new WeakMap())).toBe(false)
    expect(anyIsImmutableOrderedSet(new WeakSet())).toBe(false)
  })
})
