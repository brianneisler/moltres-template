import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsImmutableCollection from './anyIsImmutableCollection'

describe('anyIsImmutableCollection', () => {
  test('Returns true for an ImmutableList', () => {
    expect(anyIsImmutableCollection(ImmutableList())).toBe(true)
  })

  test('Returns true for an ImmutableMap', () => {
    expect(anyIsImmutableCollection(ImmutableMap())).toBe(true)
  })

  test('Returns true for an ImmutableOrderedMap', () => {
    expect(anyIsImmutableCollection(ImmutableOrderedMap())).toBe(true)
  })

  test('Returns true for an ImmutableOrderedSet', () => {
    expect(anyIsImmutableCollection(ImmutableOrderedSet())).toBe(true)
  })

  test('Returns true for an ImmutableSet', () => {
    expect(anyIsImmutableCollection(ImmutableSet())).toBe(true)
  })

  test('Returns true for an ImmutableStack', () => {
    expect(anyIsImmutableCollection(ImmutableStack())).toBe(true)
  })

  test('Returns true for a Seq', () => {
    expect(anyIsImmutableCollection(Seq([]))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutableCollection(undefined)).toBe(false)
    expect(anyIsImmutableCollection(null)).toBe(false)
    expect(anyIsImmutableCollection('')).toBe(false)
    expect(anyIsImmutableCollection('abc')).toBe(false)
    expect(anyIsImmutableCollection(false)).toBe(false)
    expect(anyIsImmutableCollection(true)).toBe(false)
    expect(anyIsImmutableCollection(0)).toBe(false)
    expect(anyIsImmutableCollection(-1)).toBe(false)
    expect(anyIsImmutableCollection(1)).toBe(false)
    expect(anyIsImmutableCollection(NaN)).toBe(false)
    expect(anyIsImmutableCollection(Infinity)).toBe(false)
    expect(anyIsImmutableCollection(-Infinity)).toBe(false)
    expect(anyIsImmutableCollection([])).toBe(false)
    expect(anyIsImmutableCollection(new Array(0))).toBe(false)
    expect(anyIsImmutableCollection([0])).toBe(false)
    expect(anyIsImmutableCollection({})).toBe(false)
    expect(anyIsImmutableCollection(/abc/)).toBe(false)
    expect(anyIsImmutableCollection(async () => {})).toBe(false)
    expect(anyIsImmutableCollection(() => {})).toBe(false)
    expect(anyIsImmutableCollection(function () {})).toBe(false)
    expect(anyIsImmutableCollection((function* () {})())).toBe(false)
    expect(anyIsImmutableCollection(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutableCollection(new Boolean(false))).toBe(false)
    expect(anyIsImmutableCollection(new Boolean(true))).toBe(false)
    expect(anyIsImmutableCollection(new Date())).toBe(false)
    expect(anyIsImmutableCollection(new Error())).toBe(false)
    expect(anyIsImmutableCollection(new Map())).toBe(false)
    expect(anyIsImmutableCollection(new Number(1))).toBe(false)
    expect(anyIsImmutableCollection(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutableCollection(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutableCollection(new Set())).toBe(false)
    expect(anyIsImmutableCollection(new String('abc'))).toBe(false)
    expect(anyIsImmutableCollection(Symbol('abc'))).toBe(false)
    expect(anyIsImmutableCollection(Symbol.for('def'))).toBe(false)
    expect(anyIsImmutableCollection(new WeakMap())).toBe(false)
    expect(anyIsImmutableCollection(new WeakSet())).toBe(false)
  })
})
