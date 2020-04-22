import reflectOwnKeys from './reflectOwnKeys'

describe('reflectOwnKeys', () => {
  test('gets property symbols and keys from an object', () => {
    const symA = Symbol('a')
    const symB = Symbol.for('b')
    expect(
      reflectOwnKeys({
        c: 'c',
        [symA]: 'a',
        [symB]: 'b'
      })
    ).toEqual(['c', symA, symB])
  })

  test('returns length for array', () => {
    expect(reflectOwnKeys([])).toEqual(['length'])
  })
})
