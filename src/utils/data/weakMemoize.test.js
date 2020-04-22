import weakMemoize from './weakMemoize'

describe('weakMemoize', () => {
  test('memoizes a function with no arguments', () => {
    const func = jest.fn(() => ({}))
    const memoizedFunc = weakMemoize(func)
    const result1 = memoizedFunc()
    const result2 = memoizedFunc()
    expect(result1).toBe(result2)
    expect(result1).toEqual({})
    expect(func).toHaveBeenCalledWith()
    expect(func).toHaveBeenCalledTimes(1)
  })

  test('memoizes a function with defaul arguments', () => {
    const func = jest.fn((arg1, arg2 = 'foo') => {
      expect(arg2).toEqual('def')
      return {}
    })
    const memoizedFunc = weakMemoize(func)
    const result1 = memoizedFunc('abc', 'def')
    const result2 = memoizedFunc('abc', 'def')
    expect(result1).toBe(result2)
    expect(result1).toEqual({})
    expect(func).toHaveBeenCalledWith('abc', 'def')
    expect(func).toHaveBeenCalledTimes(1)
  })

  test('maintains arity of memoized function', () => {
    const func = (foo, bar) => bar
    const memoizedFunc = weakMemoize(func)
    expect(memoizedFunc.length).toEqual(2)
  })
})
