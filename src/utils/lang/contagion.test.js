import { ImmutableList, ImmutableMap, Map } from './classes'
import contagion from './contagion'

describe('contagion', () => {
  describe('Array', () => {
    test('returns a new empty Array when no sample is provided', () => {
      const value = ['foo']
      const result = contagion(value)
      expect(result).not.toBe(value)
      expect(result).toEqual([])
    })
    test('returns a new empty Array when an Index sample is provided', () => {
      const value = []
      const sample = 1
      const result = contagion(value, sample)
      expect(result).not.toBe(value)
      expect(result).toEqual([])
    })
    test('returns a new empty Object when a Property sample is provided', () => {
      const value = []
      const sample = 'foo'
      const result = contagion(value, sample)
      expect(result).not.toBe(value)
      expect(result).toEqual({})
    })
    test('returns a new empty Map when a Key sample is provided', () => {
      const value = []
      const sample = {}
      const result = contagion(value, sample)
      expect(result).not.toBe(value)
      expect(result).toEqual(new Map())
    })
  })

  describe('ImmutableList', () => {
    test('returns a new empty ImmutableList when no sample is provided', () => {
      const value = ImmutableList(['foo'])
      const result = contagion(value)
      expect(result).toEqual(ImmutableList([]))
    })
    test('returns a new empty ImmutableList when an Index sample is provided', () => {
      const value = ImmutableList([])
      const sample = 1
      const result = contagion(value, sample)
      expect(result).toEqual(ImmutableList([]))
    })
    test('returns a new empty ImmutableMap when a Property sample is provided', () => {
      const value = ImmutableList([])
      const sample = 'foo'
      const result = contagion(value, sample)
      expect(result).toEqual(ImmutableMap({}))
    })
    test('returns a new empty ImmutableMap when a Key sample is provided', () => {
      const value = ImmutableList([])
      const sample = {}
      const result = contagion(value, sample)
      expect(result).toEqual(ImmutableMap({}))
    })
  })

  describe('ImmutableMap', () => {
    test('returns a new empty ImmutableMap when no sample is provided', () => {
      const value = ImmutableMap({ foo: 'bar' })
      const result = contagion(value)
      expect(result).toEqual(ImmutableMap({}))
    })
    test('returns a new empty ImmutableMap when an Index sample is provided', () => {
      const value = ImmutableMap({})
      const sample = 1
      const result = contagion(value, sample)
      expect(result).toEqual(ImmutableList([]))
    })
    test('returns a new empty ImmutableMap when a Key sample is provided', () => {
      const value = ImmutableMap({})
      const sample = {}
      const result = contagion(value, sample)
      expect(result).toEqual(ImmutableMap({}))
    })
    test('returns a new empty ImmutableMap when a Property sample is provided', () => {
      const value = ImmutableMap({})
      const sample = 'foo'
      const result = contagion(value, sample)
      expect(result).toEqual(ImmutableMap({}))
    })
  })

  describe('Object', () => {
    test('returns a new empty Object when no sample is provided', () => {
      const value = { foo: 'bar' }
      const result = contagion(value)
      expect(result).not.toBe(value)
      expect(result).toEqual({})
    })
    test('returns a new empty Array when an Index sample is provided', () => {
      const value = {}
      const sample = 1
      const result = contagion(value, sample)
      expect(result).not.toBe(value)
      expect(result).toEqual([])
    })
    test('returns a new empty Object when a Property sample is provided', () => {
      const value = {}
      const sample = 'foo'
      const result = contagion(value, sample)
      expect(result).not.toBe(value)
      expect(result).toEqual({})
    })
    test('returns a new empty Map when a Key sample is provided', () => {
      const value = {}
      const sample = {}
      const result = contagion(value, sample)
      expect(result).not.toBe(value)
      expect(result).toEqual(new Map())
    })
  })
})
