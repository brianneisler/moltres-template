import { values } from '../../../test'
import objectSetProperty from './objectSetProperty'

describe('objectSetProperty', () => {
  test('sets an existing property on an Object and returns a copy of the Object with the property set', () => {
    const object = {
      bar: 2,
      baz: 3,
      foo: 1
    }
    const result = objectSetProperty(object, 'foo', 4)
    expect(result).toEqual({
      bar: 2,
      baz: 3,
      foo: 4
    })
    expect(object).toEqual({
      bar: 2,
      baz: 3,
      foo: 1
    })
  })

  test('setting a Property that does not exist on an Object sets the Property', () => {
    const object = {
      bar: 2,
      baz: 3
    }
    const result = objectSetProperty(object, 'foo', 4)
    expect(result).toEqual({
      bar: 2,
      baz: 3,
      foo: 4
    })
    expect(object).toEqual({
      bar: 2,
      baz: 3
    })
  })

  test('setting a Property that does not exist on an Object to undefined sets the Property on the Object', () => {
    const object = {
      bar: 2,
      baz: 3
    }
    const result = objectSetProperty(object, 'foo', undefined)
    expect(result).toEqual({
      bar: 2,
      baz: 3,
      foo: undefined
    })
    expect(object).toEqual({
      bar: 2,
      baz: 3
    })
    expect(result).not.toBe(object)
  })

  test('setting an existing Property to the same value returns the same Object', () => {
    values().forEach((value) => {
      const object = { foo: value }
      const result = objectSetProperty(object, 'foo', value)
      expect(result).toEqual({ foo: value })
      expect(result).toBe(object)
    })
  })
})
