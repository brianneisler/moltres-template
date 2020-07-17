import { Map } from 'immutable'

import assocPath from './assocPath'

describe('assocPath', () => {
  test('assocPath to a nested Immutable Map', () => {
    const value = {
      foo: new Map()
    }
    expect(assocPath(['foo', 'bar', 'bim'], 'bop', value)).toEqual({
      foo: new Map([['bar', new Map([['bim', 'bop']])]])
    })
  })

  test('assocPath to an existing property', () => {
    const value = {
      foo: {
        bar: 'foo'
      }
    }
    expect(assocPath(['foo', 'bar', 'bim'], 'bop', value)).toEqual({
      foo: {
        bar: {
          bim: 'bop'
        }
      }
    })
  })

  test('assocPath to an Array', () => {
    const value = ['foo', 'bar', 'baz']
    expect(assocPath([1], 'bop', value)).toEqual(['foo', 'bop', 'baz'])
  })

  test('$ replaces entire value', async () => {
    const selector = '$'
    const value = { foo: 'bar' }
    const existing = { bar: 'baz' }
    expect(assocPath(selector, value, existing)).toEqual({ foo: 'bar' })
  })
})
