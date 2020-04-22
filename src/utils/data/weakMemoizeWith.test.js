import weakMemoizeWith from './weakMemoizeWith'

describe('weakMemoizeWith', () => {
  test('maintains arity of memoized function', () => {
    const func = (foo, bar) => bar
    const memoizedFunc = weakMemoizeWith(() => {}, func)
    expect(memoizedFunc.length).toEqual(2)
  })
})
