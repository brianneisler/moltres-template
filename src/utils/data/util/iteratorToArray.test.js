import iteratorToArray from './iteratorToArray'

describe('iteratorToArray', () => {
  test('create array from iterator', () => {
    const iterator = ['a', 'b'][Symbol.iterator]()
    expect(iteratorToArray(iterator)).toEqual(['a', 'b'])
  })
})
