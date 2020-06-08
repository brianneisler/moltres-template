import objectAssign from './objectAssign'

describe('objectAssign', () => {
  test('assigns sources to taget', () => {
    const object1 = {
      a: 1,
      b: 2,
      c: 3
    }
    const object2 = {
      c: 4,
      d: 5
    }
    const object3 = objectAssign(object1, object2)
    expect(object3).toEqual({
      a: 1,
      b: 2,
      c: 4,
      d: 5
    })
    expect(object1).toEqual({
      a: 1,
      b: 2,
      c: 4,
      d: 5
    })
    expect(object2).toEqual({
      c: 4,
      d: 5
    })
    expect(object1).toBe(object3)
  })
})
