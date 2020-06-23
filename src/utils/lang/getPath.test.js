import { ImmutableList } from './classes'
import getPath from './getPath'

describe('getPath', () => {
  test('get shallow path using Array', () => {
    const value = { foo: 'bar' }
    expect(getPath(['foo'], value)).toBe('bar')
  })

  test('get shallow path using ImmutableList', () => {
    const value = { foo: 'bar' }
    expect(getPath(ImmutableList(['foo']), value)).toBe('bar')
  })

  test('$ gets entire value', () => {
    const value = { foo: 'bar' }
    expect(getPath(['$'], value)).toBe(value)
  })

  test('string gets converted to a deep path', () => {
    const value = { foo: { bar: 'baz' } }
    expect(getPath('foo.bar', value)).toBe('baz')
  })
})
