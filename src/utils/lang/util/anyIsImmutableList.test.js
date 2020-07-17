import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsImmutableList from './anyIsImmutableList'

describe('anyIsImmutableList', () => {
  test('Returns true for an ImmutableList', () => {
    expect(anyIsImmutableList(ImmutableList())).toBe(true)
  })

  test('Returns false for an ImmutableMap', () => {
    expect(anyIsImmutableList(ImmutableMap())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedMap', () => {
    expect(anyIsImmutableList(ImmutableOrderedMap())).toBe(false)
  })

  test('Returns false for an ImmutableOrderedSet', () => {
    expect(anyIsImmutableList(ImmutableOrderedSet())).toBe(false)
  })

  test('Returns false for an ImmutableSet', () => {
    expect(anyIsImmutableList(ImmutableSet())).toBe(false)
  })

  test('Returns false for an ImmutableStack', () => {
    expect(anyIsImmutableList(ImmutableStack())).toBe(false)
  })

  test('Returns false for a Seq', () => {
    expect(anyIsImmutableList(Seq([]))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutableList(undefined)).toBe(false)
    expect(anyIsImmutableList(null)).toBe(false)
    expect(anyIsImmutableList('')).toBe(false)
    expect(anyIsImmutableList('abc')).toBe(false)
    expect(anyIsImmutableList(false)).toBe(false)
    expect(anyIsImmutableList(true)).toBe(false)
    expect(anyIsImmutableList(0)).toBe(false)
    expect(anyIsImmutableList(-1)).toBe(false)
    expect(anyIsImmutableList(1)).toBe(false)
    expect(anyIsImmutableList(NaN)).toBe(false)
    expect(anyIsImmutableList(Infinity)).toBe(false)
    expect(anyIsImmutableList(-Infinity)).toBe(false)
    expect(anyIsImmutableList([])).toBe(false)
    expect(anyIsImmutableList(new Array(0))).toBe(false)
    expect(anyIsImmutableList([0])).toBe(false)
    expect(anyIsImmutableList({})).toBe(false)
    expect(anyIsImmutableList(/abc/)).toBe(false)
    expect(anyIsImmutableList(async () => {})).toBe(false)
    expect(anyIsImmutableList(() => {})).toBe(false)
    expect(anyIsImmutableList(function () {})).toBe(false)
    expect(anyIsImmutableList((function* () {})())).toBe(false)
    expect(anyIsImmutableList(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutableList(new Boolean(false))).toBe(false)
    expect(anyIsImmutableList(new Boolean(true))).toBe(false)
    expect(anyIsImmutableList(new Date())).toBe(false)
    expect(anyIsImmutableList(new Error())).toBe(false)
    expect(anyIsImmutableList(new Map())).toBe(false)
    expect(anyIsImmutableList(new Number(1))).toBe(false)
    expect(anyIsImmutableList(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutableList(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutableList(new Set())).toBe(false)
    expect(anyIsImmutableList(new String('abc'))).toBe(false)
    expect(anyIsImmutableList(Symbol('abc'))).toBe(false)
    expect(anyIsImmutableList(Symbol.for('def'))).toBe(false)
    expect(anyIsImmutableList(new WeakMap())).toBe(false)
    expect(anyIsImmutableList(new WeakSet())).toBe(false)
  })
})
