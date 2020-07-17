import Infinity from '../classes/Infinity'
import NaN from '../classes/NaN'
import Number from '../classes/Number'
import { MAX_SAFE } from '../constants/Integer'

import anyIsInteger from './anyIsInteger'

describe('anyIsInteger', () => {
  test('returns true for primitive numbers that are integers', () => {
    expect(anyIsInteger(0)).toBe(true)
    expect(anyIsInteger(-1)).toBe(true)
    expect(anyIsInteger(1)).toBe(true)
    expect(anyIsInteger(MAX_SAFE))
  })

  test('returns true for Number objects that are integers', () => {
    expect(anyIsInteger(new Number(0))).toBe(true)
    expect(anyIsInteger(new Number(-1))).toBe(true)
    expect(anyIsInteger(new Number(1))).toBe(true)
  })

  test('returns false for primitive numbers that are not integers', () => {
    expect(anyIsInteger(-1.2)).toBe(false)
    expect(anyIsInteger(1.2)).toBe(false)
  })

  test('returns false for NaN', () => {
    expect(anyIsInteger(NaN)).toBe(false)
  })

  test('returns false for Infinity', () => {
    expect(anyIsInteger(Infinity)).toBe(false)
    expect(anyIsInteger(-Infinity)).toBe(false)
  })

  test('returns false for MIN_VALUE', () => {
    expect(anyIsInteger(Number.MIN_VALUE)).toBe(false)
  })

  test('returns false for string values that are string integers', () => {
    expect(anyIsInteger('3')).toBe(false)
  })

  test('returns false for Number objects that are not integers', () => {
    expect(anyIsInteger(new Number(-1.2))).toBe(false)
    expect(anyIsInteger(new Number(1.2))).toBe(false)
    expect(anyIsInteger(new Number(NaN))).toBe(false)
    expect(anyIsInteger(new Number(Infinity))).toBe(false)
    expect(anyIsInteger(new Number(-Infinity))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsInteger(undefined)).toBe(false)
    expect(anyIsInteger(null)).toBe(false)
    expect(anyIsInteger(false)).toBe(false)
    expect(anyIsInteger(true)).toBe(false)
    expect(anyIsInteger('')).toBe(false)
    expect(anyIsInteger('abc')).toBe(false)
    expect(anyIsInteger(/abc/)).toBe(false)
    expect(anyIsInteger([])).toBe(false)
    expect(anyIsInteger({})).toBe(false)
    expect(anyIsInteger(async () => {})).toBe(false)
    expect(anyIsInteger(() => {})).toBe(false)
    expect(anyIsInteger(function () {})).toBe(false)
    expect(anyIsInteger(function* () {})).toBe(false)
    expect(anyIsInteger((function* () {})())).toBe(false)
    expect(anyIsInteger(new Array(0))).toBe(false)
    expect(anyIsInteger(new ArrayBuffer(2))).toBe(false)
    expect(anyIsInteger(new Boolean(false))).toBe(false)
    expect(anyIsInteger(new Boolean(true))).toBe(false)
    expect(anyIsInteger(new Date())).toBe(false)
    expect(anyIsInteger(new Error())).toBe(false)
    expect(anyIsInteger(new Promise(() => {}))).toBe(false)
    expect(anyIsInteger(new Proxy({}, {}))).toBe(false)
    expect(anyIsInteger(new Set())).toBe(false)
    expect(anyIsInteger(new String())).toBe(false)
    expect(anyIsInteger(new String(''))).toBe(false)
    expect(anyIsInteger(new String('abc'))).toBe(false)
    expect(anyIsInteger(Symbol('abc'))).toBe(false)
    expect(anyIsInteger(new WeakMap())).toBe(false)
    expect(anyIsInteger(new WeakSet())).toBe(false)
  })
})
