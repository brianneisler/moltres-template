import { ImmutableMap } from './classes'
import shallowEquals from './shallowEquals'

describe('selectWildcards', () => {
  test('returns true for two objects that are shallow equal', () => {
    expect(shallowEquals({ foo: 'bar' }, { foo: 'bar' })).toBe(true)
  })

  test('returns true for two objects that are shallow equal', () => {
    expect(
      shallowEquals(ImmutableMap({ foo: 'bar' }), ImmutableMap({ foo: 'bar' }))
    ).toBe(true)
  })
})
