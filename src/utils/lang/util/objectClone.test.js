import objectClone from './objectClone'

describe('objectClone', () => {
  test('clones an object', () => {
    const object = {
      bar: 2,
      baz: 3,
      foo: 1
    }
    const result = objectClone(object)
    expect(result).toEqual({
      bar: 2,
      baz: 3,
      foo: 1
    })
    expect(result).not.toBe(object)
  })
})
