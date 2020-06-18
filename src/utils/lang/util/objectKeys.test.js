import objectKeys from './objectKeys'

describe('objectKeys', () => {
  test('returns an Array of Strings for an Object', () => {
    expect(
      objectKeys({
        bim: 'bop',
        foo: 'bar'
      })
    ).toEqual(['bim', 'foo'])
  })

  test('returns an Array of Strings for an args Array with args enum bug', () => {
    const result = (function () {
      return objectKeys(arguments)
    })('foo', 'bar')
    expect(result).toEqual(['0', '1'])
  })

  test('returns an Srray of Strings for an Object props that are part of the object enum bug', () => {
    expect(
      objectKeys({
        propertyIsEnumerable: 'bop',
        toString: 'bar'
      })
    ).toEqual(['propertyIsEnumerable', 'toString'])
  })

  test('returns an empty Array for an Object with no properties', () => {
    expect(objectKeys({})).toEqual([])
  })
})
