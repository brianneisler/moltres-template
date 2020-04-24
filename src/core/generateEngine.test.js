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
      logger: console
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
      foo: (modConfig, modContext) => {
        expect(modConfig).toBe(config)
        expect(modContext).toBe(context)
        return {
          reducer: testReducer
        }
      }
    }
    const store = generateEngine(modules, config, context)
    expect(store.getModules()).toEqual({
      config: expect.any(Object),
      context: expect.any(Object),
      core: expect.any(Object),
      error: expect.any(Object),
      foo: {
        reducer: testReducer
      },
      query: expect.any(Object),
      ssr: expect.any(Object)
    })
    expect(store.getConfig()).toEqual({
      foo: 'abc'
    })
    expect(store.getContext()).toEqual({
      bar: 'def',
      logger: console
    })

    store.dispatch(testAction)
    const state = store.getState()
    expect(state).toEqual({
      config: {
        foo: 'abc'
      },
      context: {
        bar: 'def',
        logger: console
      },
      core: {
        version: 1
      },
      error: {},
      foo: {
        foo: 'bar'
      },
      query: {}
    })
  })

  test('starts the engine and calls the setup and start methods', async () => {
    const testContext = {
      logger: console
    }
    let wasCancelled = false
    const testModule = {
      finally: jest.fn(),
      run: function* () {
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
    const engine = generateEngine(
      {
        test: testModule
      },
      {},
      testContext
    )

    expect(testModule.setup).toHaveBeenCalledWith(engine, testModule)
    expect(testModule.start).toHaveBeenCalledWith(engine, testModule)
    expect(testModule.stop).not.toHaveBeenCalled()
    expect(wasCancelled).toBe(false)

    await stop(engine)

    expect(testModule.stop).toHaveBeenCalledWith(engine, testModule)
    expect(testModule.finally).toHaveBeenCalledWith(engine, testModule)
    expect(wasCancelled).toBe(true)
  })
})
