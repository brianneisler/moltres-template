import arrayClone from './arrayClone'

describe('arrayClone', () => {
  test('clones an array', () => {
    const array = ['a', 'b', 'c']
    const result = arrayClone(array)
    expect(result).toEqual(array)
    expect(result).not.toBe(array)
  })
})
