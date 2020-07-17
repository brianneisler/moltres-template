import { ImmutableList, ImmutableMap } from './classes'
import selectWildcards from './selectWildcards'

describe('selectWildcards', () => {
  test('returns empty ImmutableList for selector with no wildcards', () => {
    const selector = ['foo']
    const state = {
      foo: 'bar'
    }
    expect(selectWildcards(selector, state)).toEqual(ImmutableList([]))
  })

  test('returns an ImmutableList of wildcard values for a single wildcard', () => {
    const selector = ['foo', ':bar']
    const state = {
      foo: {
        id1: 'bar1',
        id2: 'bar2',
        id3: 'bar3'
      }
    }
    expect(selectWildcards(selector, state)).toEqual(
      ImmutableList([
        ImmutableMap({
          ':bar': 'id1'
        }),
        ImmutableMap({
          ':bar': 'id2'
        }),
        ImmutableMap({
          ':bar': 'id3'
        })
      ])
    )
  })

  test('returns an ImmutableList of wildcard values for a double wildcard', () => {
    const selector = ['foo', ':bar', ':baz']
    const state = {
      foo: {
        bar1: {
          baz1: 'val1',
          baz2: 'val2'
        },
        bar2: {
          baz3: 'val3',
          baz4: 'val4'
        }
      }
    }
    expect(selectWildcards(selector, state)).toEqual(
      ImmutableList([
        ImmutableMap({
          ':bar': 'bar1',
          ':baz': 'baz1'
        }),
        ImmutableMap({
          ':bar': 'bar1',
          ':baz': 'baz2'
        }),
        ImmutableMap({
          ':bar': 'bar2',
          ':baz': 'baz3'
        }),
        ImmutableMap({
          ':bar': 'bar2',
          ':baz': 'baz4'
        })
      ])
    )
  })
})
