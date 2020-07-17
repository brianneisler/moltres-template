import objectGetPrototypeOf from './objectGetPrototypeOf'

describe('objectGetPrototypeOf', () => {
  test('get prototype of object', () => {
    const proto = {}
    const obj = Object.create(proto)
    expect(objectGetPrototypeOf(obj)).toBe(proto)
  })
})
