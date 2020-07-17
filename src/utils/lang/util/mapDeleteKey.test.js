import mapDeleteKey from './mapDeleteKey'

describe('mapDeleteKey', () => {
  it('deletes a Key from a Map and returns a new copy of the Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    const result = mapDeleteKey(map, 'a')

    expect(result).toEqual(
      new Map([
        ['b', 2],
        ['c', 3]
      ])
    )
    expect(map).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
    )
  })

  it('deleting a non-existing Key from a Map and returns the same Map with no changes', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    const result = mapDeleteKey(map, 'd')

    expect(map).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
    )
    expect(result).toBe(map)
  })
})
