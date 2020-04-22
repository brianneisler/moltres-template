import { cancelled, take } from 'redux-saga/effects'
import createEngine from './createEngine'
import stop from './stop'

describe('createEngine', () => {
  test('correctly creates an engine with no modules', () => {
    const testModules = {}
    const config = { foo: 'bar' }
    const context = { bim: ' bop' }
    const engine = createEngine(testModules, config, context)

    expect(engine.getModules()).toMatchObject({
      core: expect.any(Object)
    })

    expect(engine.getConfig()).toBe(config)
    expect(engine.getContext()).toBe(context)
    expect(engine.getState()).toEqual({
      config,
      context,
      core: {
        version: 1
      }
    })
  })

  test('correctly sets up a module and receives action that sets state', () => {
    const config = {
      foo: 'abc'
    }
    const context = {
      bar: 'def'
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
    const store = createEngine(modules, config, context)
    expect(store.getModules()).toEqual({
      config: expect.any(Object),
      context: expect.any(Object),
      core: expect.any(Object),
      foo: {
        reducer: testReducer
      }
    })
    expect(store.getConfig()).toEqual({
      foo: 'abc'
    })
    expect(store.getContext()).toEqual({
      bar: 'def'
    })

    store.dispatch(testAction)
    const state = store.getState()
    expect(state).toEqual({
      config: {
        foo: 'abc'
      },
      context: {
        bar: 'def'
      },
      core: {
        version: 1
      },
      foo: {
        foo: 'bar'
      }
    })
  })

  test('starts the engine and calls the setup and start methods', async () => {
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
    const engine = createEngine({
      test: testModule
    })

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