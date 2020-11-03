import { cancelled, take } from 'redux-saga/effects'

import createEngine from './createEngine'
import setup from './setup'
import start from './start'
import stop from './stop'

describe('createEngine', () => {
  test('correctly creates an engine with no modules', () => {
    const testModules = {}
    const config = { foo: 'bar' }
    const context = {
      bim: ' bop',
      config
    }
    const engine = createEngine(testModules, context)

    expect(engine.getModules()).toMatchObject({
      core: expect.any(Object)
    })

    expect(engine.getConfig()).toBe(config)
    expect(engine.getContext()).toEqual(expect.objectContaining(context))
    expect(engine.getState()).toEqual({
      app: expect.any(Object),
      config,
      context: expect.objectContaining(context),
      core: {
        version: 1
      },
      error: {},
      query: {}
    })
  })

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
    const store = createEngine(modules, context)
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

    const engine = createEngine(
      {
        test: testModule
      },
      testContext
    )

    expect(instance.setup).not.toHaveBeenCalled()
    expect(instance.start).not.toHaveBeenCalled()
    expect(instance.stop).not.toHaveBeenCalled()
    expect(wasCancelled).toBe(false)

    setup(engine)

    expect(instance.setup).toHaveBeenCalledWith(engine, instance)
    expect(instance.start).not.toHaveBeenCalled()
    expect(instance.stop).not.toHaveBeenCalled()
    expect(wasCancelled).toBe(false)

    start(engine)

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
