import createStore from './createStore'

describe('createStore', () => {
  test('correctly sets up a module and receives action that sets state', () => {
    const testAction = {
      type: 'foo-action',
      payload: 'bar'
    }
    const testReducer = (state, action) => {
      if (action.type === 'foo-action') {
        expect(action).toEqual(testAction)
        return {
          foo: action.payload
        }
      }
      return {}
    }
    const modules = {
      foo: (config) => {
        expect(config).toBe('abc')
        return {
          reducer: testReducer
        }
      }
    }
    const config = {
      foo: 'abc'
    }
    const store = createStore(modules, config)
    expect(store.getModules()).toEqual({
      foo: {
        reducer: testReducer
      }
    })
    expect(store.getConfig()).toEqual({
      foo: 'abc'
    })

    store.dispatch(testAction)
    const state = store.getState()
    expect(state).toEqual({
      foo: {
        foo: 'bar'
      }
    })
  })
})
