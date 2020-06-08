import mapHasKey from './mapHasKey'

describe('mapHasKey', () => {
  it('returns true if Map contains Key', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    const result = mapHasKey(map, 'a')
    expect(result).toBe(true)
  })
})
