import { MAX_SAFE_INTEGER } from '../constants'
import anyIsIndex from './anyIsIndex'

describe('anyIsIndex', () => {
  test('returns true for positive integer numbers and 0', () => {
    expect(anyIsIndex(0)).toBe(true)
    expect(anyIsIndex(1)).toBe(true)
    expect(anyIsIndex(MAX_SAFE_INTEGER - 1)).toBe(true)
  })

  test('returns true for Number objects that are positive integers', () => {
    expect(anyIsIndex(new Number(0))).toBe(true)
    expect(anyIsIndex(new Number(1))).toBe(true)
    expect(anyIsIndex(new Number(MAX_SAFE_INTEGER - 1))).toBe(true)
  })

  test('returns true for string values that are string integers', () => {
    expect(anyIsIndex('0')).toBe(true)
    expect(anyIsIndex('3')).toBe(true)
    expect(anyIsIndex('' + (MAX_SAFE_INTEGER - 1))).toBe(true)
  })

  test('returns false for number greater than or equal to MAX_SAFE_INTEGER', () => {
    expect(anyIsIndex(MAX_SAFE_INTEGER)).toBe(false)
    expect(anyIsIndex(MAX_SAFE_INTEGER + 1)).toBe(false)
  })

  test('returns false for string number greater than or equal to MAX_SAFE_INTEGER', () => {
    expect(anyIsIndex('' + MAX_SAFE_INTEGER)).toBe(false)
    expect(anyIsIndex('' + (MAX_SAFE_INTEGER + 1))).toBe(false)
  })

  test('returns false for primitive integers less than 0', () => {
    expect(anyIsIndex(-1)).toBe(false)
    expect(anyIsIndex(-MAX_SAFE_INTEGER)).toBe(false)
  })

  test('returns false for string integers less than 0', () => {
    expect(anyIsIndex('-1')).toBe(false)
    expect(anyIsIndex('' + -MAX_SAFE_INTEGER)).toBe(false)
  })

  test('returns false for primitive numbers that are not integers', () => {
    expect(anyIsIndex(-1.2)).toBe(false)
    expect(anyIsIndex(1.2)).toBe(false)
  })

  test('returns false for NaN', () => {
    expect(anyIsIndex(NaN)).toBe(false)
  })

  test('returns false for Infinity', () => {
    expect(anyIsIndex(Infinity)).toBe(false)
    expect(anyIsIndex(-Infinity)).toBe(false)
  })

  test('returns false for MIN_VALUE', () => {
    expect(anyIsIndex(Number.MIN_VALUE)).toBe(false)
  })

  test('returns false for Number objects that are not integers', () => {
    expect(anyIsIndex(new Number(-1.2))).toBe(false)
    expect(anyIsIndex(new Number(1.2))).toBe(false)
    expect(anyIsIndex(new Number(NaN))).toBe(false)
    expect(anyIsIndex(new Number(Infinity))).toBe(false)
    expect(anyIsIndex(new Number(-Infinity))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsIndex(undefined)).toBe(false)
    expect(anyIsIndex(null)).toBe(false)
    expect(anyIsIndex(false)).toBe(false)
    expect(anyIsIndex(true)).toBe(false)
    expect(anyIsIndex('')).toBe(false)
    expect(anyIsIndex('abc')).toBe(false)
    expect(anyIsIndex(/abc/)).toBe(false)
    expect(anyIsIndex([])).toBe(false)
    expect(anyIsIndex({})).toBe(false)
    expect(anyIsIndex(async () => {})).toBe(false)
    expect(anyIsIndex(() => {})).toBe(false)
    expect(anyIsIndex(function() {})).toBe(false)
    expect(anyIsIndex(function*() {})).toBe(false)
    expect(anyIsIndex((function*() {})())).toBe(false)
    expect(anyIsIndex(new Array(0))).toBe(false)
    expect(anyIsIndex(new ArrayBuffer(2))).toBe(false)
    expect(anyIsIndex(new Boolean(false))).toBe(false)
    expect(anyIsIndex(new Boolean(true))).toBe(false)
    expect(anyIsIndex(new Date())).toBe(false)
    expect(anyIsIndex(new Error())).toBe(false)
    expect(anyIsIndex(new Promise(() => {}))).toBe(false)
    expect(anyIsIndex(new Proxy({}, {}))).toBe(false)
    expect(anyIsIndex(new Set())).toBe(false)
    expect(anyIsIndex(new String())).toBe(false)
    expect(anyIsIndex(new String(''))).toBe(false)
    expect(anyIsIndex(new String('abc'))).toBe(false)
    expect(anyIsIndex(Symbol('abc'))).toBe(false)
    expect(anyIsIndex(new WeakMap())).toBe(false)
    expect(anyIsIndex(new WeakSet())).toBe(false)
  })
})
