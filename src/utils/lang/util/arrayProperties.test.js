import arrayProperties from './arrayProperties'

describe('arrayProperties', () => {
  test('returns an empty Array for an empty Array', () => {
    const array = []
    expect(arrayProperties(array)).toEqual([])
  })

  test('returns an empty Array for an Array that has only indexes', () => {
    const array = [1, 2, 3]
    expect(arrayProperties(array)).toEqual([])
  })

  test('returns an Array of the custom properties but not indexes for an Array with indexes', () => {
    const array = [1, 2, 3]
    array.foo = 'bar'
    expect(arrayProperties(array)).toEqual(['foo'])
  })
})
