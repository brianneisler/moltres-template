import ImmutableList from '../classes/ImmutableList'
import ImmutableMap from '../classes/ImmutableMap'
import ImmutableOrderedMap from '../classes/ImmutableOrderedMap'
import ImmutableOrderedSet from '../classes/ImmutableOrderedSet'
import ImmutableSet from '../classes/ImmutableSet'
import ImmutableStack from '../classes/ImmutableStack'
import Seq from '../classes/Seq'

import anyIsSeq from './anyIsSeq'

describe('anyIsSeq', () => {
  test('Returns true for a Seq', () => {
    expect(anyIsSeq(Seq([]))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsSeq(undefined)).toBe(false)
    expect(anyIsSeq(null)).toBe(false)
    expect(anyIsSeq('')).toBe(false)
    expect(anyIsSeq('abc')).toBe(false)
    expect(anyIsSeq(false)).toBe(false)
    expect(anyIsSeq(true)).toBe(false)
    expect(anyIsSeq(0)).toBe(false)
    expect(anyIsSeq(-1)).toBe(false)
    expect(anyIsSeq(1)).toBe(false)
    expect(anyIsSeq(NaN)).toBe(false)
    expect(anyIsSeq(Infinity)).toBe(false)
    expect(anyIsSeq(-Infinity)).toBe(false)
    expect(anyIsSeq([])).toBe(false)
    expect(anyIsSeq(new Array(0))).toBe(false)
    expect(anyIsSeq([0])).toBe(false)
    expect(anyIsSeq({})).toBe(false)
    expect(anyIsSeq(/abc/)).toBe(false)
    expect(anyIsSeq(async () => {})).toBe(false)
    expect(anyIsSeq(() => {})).toBe(false)
    expect(anyIsSeq(function () {})).toBe(false)
    expect(anyIsSeq((function* () {})())).toBe(false)
    expect(anyIsSeq(new ArrayBuffer(2))).toBe(false)
    expect(anyIsSeq(new Boolean(false))).toBe(false)
    expect(anyIsSeq(new Boolean(true))).toBe(false)
    expect(anyIsSeq(new Date())).toBe(false)
    expect(anyIsSeq(new Error())).toBe(false)
    expect(anyIsSeq(new Map())).toBe(false)
    expect(anyIsSeq(new Number(1))).toBe(false)
    expect(anyIsSeq(new Promise(() => {}))).toBe(false)
    expect(anyIsSeq(new Proxy({}, {}))).toBe(false)
    expect(anyIsSeq(new Set())).toBe(false)
    expect(anyIsSeq(new String('abc'))).toBe(false)
    expect(anyIsSeq(Symbol('abc'))).toBe(false)
    expect(anyIsSeq(Symbol.for('def'))).toBe(false)
    expect(anyIsSeq(new WeakMap())).toBe(false)
    expect(anyIsSeq(new WeakSet())).toBe(false)
    expect(anyIsSeq(ImmutableList())).toBe(false)
    expect(anyIsSeq(ImmutableMap())).toBe(false)
    expect(anyIsSeq(ImmutableOrderedMap())).toBe(false)
    expect(anyIsSeq(ImmutableOrderedSet())).toBe(false)
    expect(anyIsSeq(ImmutableSet())).toBe(false)
    expect(anyIsSeq(ImmutableStack())).toBe(false)
  })
})
