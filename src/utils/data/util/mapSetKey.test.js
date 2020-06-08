import { values } from '../../../tests/util/values'
import Map from './js/Map'
import mapSetKey from './mapSetKey'

describe('mapSetKey', () => {
  test('sets an existing Key on a Map and returns a copy of the Map with the Key set', () => {
    const map = new Map([
      ['bar', 2],
      ['baz', 3],
      ['foo', 1]
    ])
    const result = mapSetKey(map, 'foo', 4)
    expect(result).toEqual(
      new Map([
        ['bar', 2],
        ['baz', 3],
        ['foo', 4]
      ])
    )
    expect(map).toEqual(
      new Map([
        ['bar', 2],
        ['baz', 3],
        ['foo', 1]
      ])
    )
  })

  test('setting a Key that does not exist on an Map sets the Key', () => {
    const map = new Map([
      ['bar', 2],
      ['baz', 3]
    ])
    const result = mapSetKey(map, 'foo', 4)
    expect(result).toEqual(
      new Map([
        ['bar', 2],
        ['baz', 3],
        ['foo', 4]
      ])
    )
    expect(map).toEqual(
      new Map([
        ['bar', 2],
        ['baz', 3]
      ])
    )
  })

  test('setting a Key that does not exist on an Map to undefined sets the Key on the Map', () => {
    const map = new Map([
      ['bar', 2],
      ['baz', 3]
    ])
    const result = mapSetKey(map, 'foo', undefined)
    expect(result).toEqual(
      new Map([
        ['bar', 2],
        ['baz', 3],
        ['foo', undefined]
      ])
    )
    expect(map).toEqual(
      new Map([
        ['bar', 2],
        ['baz', 3]
      ])
    )
    expect(result).not.toBe(map)
  })

  test('setting an existing Key to the same value returns the same Map', () => {
    values().forEach((value) => {
      const map = new Map([['foo', value]])
      const result = mapSetKey(map, 'foo', value)
      expect(result).toEqual(new Map([['foo', value]]))
      expect(result).toBe(map)
    })
  })
})
