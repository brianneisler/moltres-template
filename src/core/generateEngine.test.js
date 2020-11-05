import { cancelled, take } from 'redux-saga/effects'

import generateEngine from './generateEngine'
import stop from './stop'

describe('generateEngine', () => {
  test('correctly sets up a module and receives action that sets state', () => {
    const config = {
      foo: 'abc'
    }
    const context = {
      bar: 'def',
      config
    }
    const testAction = {
      payload: 'bar',
      type: 'foo-action'
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
      foo: (modContext) => {
        expect(modContext).toEqual(expect.objectContaining(context))
        return {
          reducer: testReducer
        }
      }
    }
    const store = generateEngine(modules, context)
    expect(store.getModules()).toEqual({
      action: expect.any(Object),
      api: expect.any(Object),
      app: expect.any(Object),
      config: expect.any(Object),
      context: expect.any(Object),
      core: expect.any(Object),
      entity: expect.any(Object),
      error: expect.any(Object),
      event: expect.any(Object),
      firebase: expect.any(Object),
      foo: {
        reducer: testReducer
      },
      index: expect.any(Object),
      logger: expect.any(Object),
      query: expect.any(Object),
      ssr: expect.any(Object),
      test: expect.any(Object)
    })
    expect(store.getConfig()).toEqual({
      foo: 'abc'
    })
    expect(store.getContext()).toEqual(expect.objectContaining(context))

    store.dispatch(testAction)
    const state = store.getState()
    expect(state).toEqual({
      app: expect.any(Object),
      config: {
        foo: 'abc'
      },
      context: expect.objectContaining(context),
      core: expect.any(Object),
      error: expect.any(Object),
      foo: {
        foo: 'bar'
      },
      query: expect.any(Object)
    })
  })

  test('starts the engine and calls the setup and start methods', async () => {
    const testContext = {
      source: 'https://moltres.io/test'
    }
    let wasCancelled = false
    const instance = {
      finally: jest.fn(),
      *run() {
        try {
          yield take('NEVER_GONNA_HAPPEN')
        } finally {
          if (yield cancelled()) {
            wasCancelled = true
          }
        }
      },
      setup: jest.fn(),
      start: jest.fn(),
      stop: jest.fn()
    }
    const testModule = () => instance
    const engine = generateEngine(
      {
        test: testModule
      },
      testContext
    )

    expect(instance.setup).toHaveBeenCalledWith(engine, instance)
    expect(instance.start).toHaveBeenCalledWith(engine, instance)
    expect(instance.stop).not.toHaveBeenCalled()
    expect(wasCancelled).toBe(false)

    await stop(engine)

    expect(instance.stop).toHaveBeenCalledWith(engine, instance)
    expect(instance.finally).toHaveBeenCalledWith(engine, instance)
    expect(wasCancelled).toBe(true)
  })
})
