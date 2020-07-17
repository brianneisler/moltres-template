import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsImmutableSet from './anyIsImmutableSet'

describe('anyIsImmutableSet', () => {
  test('Returns true for an ImmutableOrderedSet', () => {
    expect(anyIsImmutableSet(ImmutableOrderedSet())).toBe(true)
  })

  test('Returns true for an ImmutableSet', () => {
    expect(anyIsImmutableSet(ImmutableSet())).toBe(true)
  })

  test('Returns false for an ImmutableList', () => {
    expect(anyIsImmutableSet(ImmutableList())).toBe(false)
  })

  test('Returns false for an ImmutableMap', () => {
    expect(anyIsImmutableSet(ImmutableMap())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedMap', () => {
    expect(anyIsImmutableSet(ImmutableOrderedMap())).toBe(false)
  })

  test('Returns false for an ImmutableStack', () => {
    expect(anyIsImmutableSet(ImmutableStack())).toBe(false)
  })

  test('Returns false for a Seq', () => {
    expect(anyIsImmutableSet(Seq([]))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutableSet(undefined)).toBe(false)
    expect(anyIsImmutableSet(null)).toBe(false)
    expect(anyIsImmutableSet('')).toBe(false)
    expect(anyIsImmutableSet('abc')).toBe(false)
    expect(anyIsImmutableSet(false)).toBe(false)
    expect(anyIsImmutableSet(true)).toBe(false)
    expect(anyIsImmutableSet(0)).toBe(false)
    expect(anyIsImmutableSet(-1)).toBe(false)
    expect(anyIsImmutableSet(1)).toBe(false)
    expect(anyIsImmutableSet(NaN)).toBe(false)
    expect(anyIsImmutableSet(Infinity)).toBe(false)
    expect(anyIsImmutableSet(-Infinity)).toBe(false)
    expect(anyIsImmutableSet([])).toBe(false)
    expect(anyIsImmutableSet(new Array(0))).toBe(false)
    expect(anyIsImmutableSet([0])).toBe(false)
    expect(anyIsImmutableSet({})).toBe(false)
    expect(anyIsImmutableSet(/abc/)).toBe(false)
    expect(anyIsImmutableSet(async () => {})).toBe(false)
    expect(anyIsImmutableSet(() => {})).toBe(false)
    expect(anyIsImmutableSet(function () {})).toBe(false)
    expect(anyIsImmutableSet((function* () {})())).toBe(false)
    expect(anyIsImmutableSet(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutableSet(new Boolean(false))).toBe(false)
    expect(anyIsImmutableSet(new Boolean(true))).toBe(false)
    expect(anyIsImmutableSet(new Date())).toBe(false)
    expect(anyIsImmutableSet(new Error())).toBe(false)
    expect(anyIsImmutableSet(new Map())).toBe(false)
    expect(anyIsImmutableSet(new Number(1))).toBe(false)
    expect(anyIsImmutableSet(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutableSet(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutableSet(new Set())).toBe(false)
    expect(anyIsImmutableSet(new String('abc'))).toBe(false)
    expect(anyIsImmutableSet(Symbol('abc'))).toBe(false)
    expect(anyIsImmutableSet(Symbol.for('def'))).toBe(false)
    expect(anyIsImmutableSet(new WeakMap())).toBe(false)
    expect(anyIsImmutableSet(new WeakSet())).toBe(false)
  })
})
