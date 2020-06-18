import arrayGetIndex from './arrayGetIndex'

describe('arrayGetIndex', () => {
  test('gets Index from an Array', () => {
    const array = ['a', 'b', 'c']
    expect(arrayGetIndex(array, 0)).toEqual('a')
  })

  test('returns undefined for an index that does not exist', () => {
    const array = ['a', 'b', 'c']
    expect(arrayGetIndex(array, 3)).toEqual(undefined)
  })
})
