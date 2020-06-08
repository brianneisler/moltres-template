import objectSymbols from './objectSymbols'

describe('objectSymbols', () => {
  test('gets property symbols from an object', () => {
    const symA = Symbol('a')
    const symB = Symbol.for('b')
    expect(
      objectSymbols({
        [symA]: 'a',
        [symB]: 'b'
      })
    ).toEqual([symA, symB])
  })

  test('does not return non enumerable symbols', () => {
    const symA = Symbol('a')
    const object = {}
    Object.defineProperty(object, symA, {
      configurable: true,
      enumerable: false,
      value: 'bar'
    })

    expect(objectSymbols(object)).toEqual([])
  })
})
