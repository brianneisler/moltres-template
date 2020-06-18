import mapClone from './mapClone'

describe('mapClone', () => {
  test('clones a Map', () => {
    const map = new Map([
      ['bar', 2],
      ['baz', 3],
      ['foo', 1]
    ])
    const result = mapClone(map)
    expect(result).toEqual(
      new Map([
        ['bar', 2],
        ['baz', 3],
        ['foo', 1]
      ])
    )
    expect(result).not.toBe(map)
  })
})
