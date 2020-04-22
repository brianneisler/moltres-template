import createSelector from './createSelector'

describe('createSelector', () => {
  test('single function selector without reducer returns returned selector value', () => {
    const selector = createSelector((state) => state.foo)
    const state = { foo: 'bar' }
    expect(selector.select(state)).toEqual('bar')
  })

  test('single string selector without reducer returns returned selector value', () => {
    const selector = createSelector('foo')
    const state = { foo: 'bar' }
    expect(selector.select(state)).toEqual('bar')
  })

  test('single string selector with reducer returns reducer value', () => {
    const reducer = jest.fn((acc) => acc + 'baz')
    const selector = createSelector('foo', reducer)
    const state = { foo: 'bar' }
    expect(selector.select(state)).toEqual('barbaz')
    expect(reducer).toHaveBeenCalledWith('bar')
  })

  test('multiple string selector without reducer returns array of values', () => {
    const selector = createSelector(['foo', 'bar'])
    const state = { bar: 'value1', foo: 'value2' }
    expect(selector.select(state)).toEqual(['value2', 'value1'])
  })

  test('multiple string selector without reducer returns array of values', () => {
    const reducer = jest.fn((acc1, acc2) => acc1 + acc2 + 'baz')
    const selector = createSelector(['foo', 'bar'], reducer)
    const state = { bar: 'value1', foo: 'value2' }
    expect(selector.select(state)).toEqual('value2value1baz')
    expect(reducer).toHaveBeenCalledWith('value2', 'value1')
  })

  test('memoizes the call to the reducer', () => {
    const reducer = jest.fn((acc1, acc2) => acc1 + acc2 + 'baz')
    const selector = createSelector(['foo', 'bar'], reducer)
    const result1 = selector.select({ bar: 'value1', foo: 'value2' })
    const result2 = selector.select({ bar: 'value1', foo: 'value2' })
    expect(result1).toEqual('value2value1baz')
    expect(result2).toEqual('value2value1baz')
    expect(reducer).toHaveBeenCalledWith('value2', 'value1')
    expect(reducer).toHaveBeenCalledTimes(1)
  })

  test('memoizes the call to the selector', () => {
    const select = jest.fn((state) => state.foo)
    const selector = createSelector(select)
    const state = { foo: 'bar' }
    const result1 = selector.select(state)
    const result2 = selector.select(state)
    expect(result1).toEqual('bar')
    expect(result2).toEqual('bar')
    expect(select).toHaveBeenCalledWith(state)
    expect(select).toHaveBeenCalledTimes(1)
  })
})
