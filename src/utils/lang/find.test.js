import { ImmutableList } from './classes'
import find from './find'

describe('find', () => {
  test('finds a value in an Array', () => {
    const collection = [{ value: 'foo' }, { value: 'bar' }]
    expect(find((value) => value.value === 'bar', collection)).toEqual({
      value: 'bar'
    })
  })

  test('finds a value in an ImmutableList', () => {
    const collection = ImmutableList([{ value: 'foo' }, { value: 'bar' }])
    expect(find((value) => value.value === 'bar', collection)).toEqual({
      value: 'bar'
    })
  })
})
