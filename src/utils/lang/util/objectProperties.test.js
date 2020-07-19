import { Symbol } from '../classes'

import objectProperties from './objectProperties'

describe('objectProperties', () => {
  test('returns an Array of Strings for an Object', () => {
    expect(
      objectProperties({
        bim: 'bop',
        foo: 'bar'
      })
    ).toEqual(['bim', 'foo'])
  })

  test('returns an Array of Strings for an args Array with args enum bug', () => {
    const result = (function () {
      return objectProperties(arguments)
    })('foo', 'bar')
    expect(result).toEqual(['0', '1'])
  })

  test('returns an Srray of Strings for an Object props that are part of the object enum bug', () => {
    expect(
      objectProperties({
        propertyIsEnumerable: 'bop',
        toString: 'bar'
      })
    ).toEqual(['propertyIsEnumerable', 'toString'])
  })

  test('returns an empty Array for an Object with no properties', () => {
    expect(objectProperties({})).toEqual([])
  })

  test('returns Symbols', () => {
    const fooSym = Symbol('foo')
    expect(
      objectProperties({
        [fooSym]: 'bar'
      })
    ).toEqual([fooSym])
  })
})
