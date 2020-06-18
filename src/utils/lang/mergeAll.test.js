import mergeAll from './mergeAll'

describe('mergeAll', () => {
  test('merges objects with different props', () => {
    expect(mergeAll({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
  })
})
