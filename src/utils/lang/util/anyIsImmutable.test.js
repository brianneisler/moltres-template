import { ImmutableList, ImmutableMap, ImmutableSet } from '../classes'

import anyIsImmutable from './anyIsImmutable'

describe('anyIsImmutable', () => {
  test('returns true for ImmutableMap', () => {
    expect(anyIsImmutable(ImmutableMap())).toBe(true)
  })

  test('returns true for ImmutableList', () => {
    expect(anyIsImmutable(ImmutableList())).toBe(true)
  })

  test('returns true for ImmutableSet', () => {
    expect(anyIsImmutable(ImmutableSet())).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsImmutable(undefined)).toBe(false)
    expect(anyIsImmutable(null)).toBe(false)
    expect(anyIsImmutable('')).toBe(false)
    expect(anyIsImmutable('abc')).toBe(false)
    expect(anyIsImmutable(false)).toBe(false)
    expect(anyIsImmutable(true)).toBe(false)
    expect(anyIsImmutable(0)).toBe(false)
    expect(anyIsImmutable(-1)).toBe(false)
    expect(anyIsImmutable(1)).toBe(false)
    expect(anyIsImmutable(NaN)).toBe(false)
    expect(anyIsImmutable(Infinity)).toBe(false)
    expect(anyIsImmutable(-Infinity)).toBe(false)
    expect(anyIsImmutable({})).toBe(false)
    expect(anyIsImmutable([])).toBe(false)
    expect(anyIsImmutable(/abc/)).toBe(false)
    expect(anyIsImmutable((function* () {})())).toBe(false)
    expect(anyIsImmutable(new Array(0))).toBe(false)
    expect(anyIsImmutable(new ArrayBuffer(2))).toBe(false)
    expect(anyIsImmutable(new Boolean(false))).toBe(false)
    expect(anyIsImmutable(new Boolean(true))).toBe(false)
    expect(anyIsImmutable(new Date())).toBe(false)
    expect(anyIsImmutable(new Error())).toBe(false)
    expect(anyIsImmutable(new Number(1))).toBe(false)
    expect(anyIsImmutable(new Promise(() => {}))).toBe(false)
    expect(anyIsImmutable(new Proxy({}, {}))).toBe(false)
    expect(anyIsImmutable(new Set())).toBe(false)
    expect(anyIsImmutable(new String('abc'))).toBe(false)
    expect(anyIsImmutable(Symbol('abc'))).toBe(false)
    expect(anyIsImmutable(new WeakMap())).toBe(false)
    expect(anyIsImmutable(new WeakSet())).toBe(false)
    expect(anyIsImmutable(async () => {})).toBe(false)
    expect(anyIsImmutable(() => {})).toBe(false)
    expect(anyIsImmutable(function () {})).toBe(false)
    expect(anyIsImmutable(function* () {})).toBe(false)
  })
})
