import objectGetOwnPropertySymbols from './objectGetOwnPropertySymbols'

describe('objectGetOwnPropertySymbols', () => {
  test('gets property symbols from an object', () => {
    const symA = Symbol('a')
    const symB = Symbol.for('b')
    expect(
      objectGetOwnPropertySymbols({
        [symA]: 'a',
        [symB]: 'b'
      })
    ).toEqual([symA, symB])
  })

  test('gets non enumerable symbols', () => {
    const symA = Symbol('a')
    const object = {}
    Object.defineProperty(object, symA, {
      configurable: true,
      enumerable: false,
      value: 'bar'
    })

    expect(objectGetOwnPropertySymbols(object)).toEqual([symA])
  })
})
