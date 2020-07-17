import { ImmutableMap } from './classes'
import replaceWildcards from './replaceWildcards'

describe('replaceWildcards', () => {
  test('calling replaceWildcards on an Array with no wildcards returns the same Array', () => {
    const path = ['foo', 'bar', 'baz']
    const wildValues = ImmutableMap({})
    expect(replaceWildcards(wildValues, path)).toBe(path)
  })

  test('replaces wildcard in an array', () => {
    const path = ['foo', ':bar', 'baz']
    const wildValues = ImmutableMap({
      ':bar': 'bop'
    })
    expect(replaceWildcards(wildValues, path)).toEqual(['foo', 'bop', 'baz'])
  })

  test('replaces two wildcards in an array', () => {
    const path = ['foo', ':bar', ':baz']
    const wildValues = ImmutableMap({
      ':bar': 'bim',
      ':baz': 'bop'
    })
    expect(replaceWildcards(wildValues, path)).toEqual(['foo', 'bim', 'bop'])
  })
})
