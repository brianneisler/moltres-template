import mapGetKey from './mapGetKey'

describe('mapGetKey', () => {
  it('returns the value if Map contains Key', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    const result = mapGetKey(map, 'a')
    expect(result).toBe(1)
  })

  it('returns undefined if Map does not contain the Key', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    const result = mapGetKey(map, 'd')
    expect(result).toBe(undefined)
  })
})
