import { ImmutableList, ImmutableMap } from './classes'
import createSelector from './createSelector'
import findWildcards from './findWildcards'

describe('findWildcards', () => {
  test('selector with no wildcards should return an empty Map', () => {
    const selector = createSelector(['foo'])
    const results = findWildcards(selector)
    expect(results).toEqual(ImmutableMap({}))
  })

  test('selector with single selector and single wildcard should return a Map with one item', () => {
    const selector = createSelector(['foo.:bar'])
    const results = findWildcards(selector)
    expect(results).toEqual(
      ImmutableMap({
        ':bar': ImmutableMap({
          basePath: ImmutableList(['foo']),
          name: ':bar'
        })
      })
    )
  })

  test('selector with single selector and double wildcard should return a Map with two items', () => {
    const selector = createSelector(['foo.:bar.:baz'])
    const results = findWildcards(selector)
    expect(results).toEqual(
      ImmutableMap({
        ':bar': ImmutableMap({
          basePath: ImmutableList(['foo']),
          name: ':bar'
        }),
        ':baz': ImmutableMap({
          basePath: ImmutableList(['foo', ':bar']),
          name: ':baz'
        })
      })
    )
  })

  test('selector with two selectors and single wildcards should return a Map with two items', () => {
    const selector = createSelector(['foo1.:bar', 'foo2.:baz'])
    const results = findWildcards(selector)
    expect(results).toEqual(
      ImmutableMap({
        ':bar': ImmutableMap({
          basePath: ImmutableList(['foo1']),
          name: ':bar'
        }),
        ':baz': ImmutableMap({
          basePath: ImmutableList(['foo2']),
          name: ':baz'
        })
      })
    )
  })
})
