import Promise from 'bluebird'
import { isPromise } from 'moltres-utils'
import { createEngine, createAction, handleAction, takeEvery } from '../src'

describe('handle action integration tests', () => {
  expect.extend({
    toBePromise(received) {
      return {
        message: () => `expected ${received} to be a Promise`,
        pass: isPromise(received)
      }
    }
  })
  test('dispatch returns an action with a promise when an async handle action is triggered', async () => {
    const testAction = createAction('TEST_ACTION', (value) => ({ value }))

    const runAsync = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 500)
      })
    const actionHandler = handleAction(function*(context, action) {
      expect(context).toEqual({})
      expect(action).toEqual({
        type: 'TEST_ACTION',
        payload: {
          value: 'abc123'
        },
        promise: expect.toBePromise()
      })
      return yield runAsync()
    })

    const engine = createEngine(
      {
        test: {
          run: function*() {
            yield takeEvery(testAction, actionHandler)
          }
        }
      },
      {}
    )

    const dispatched = engine.dispatch(testAction('abc123'))
    expect(dispatched).toEqual({
      type: 'TEST_ACTION',
      payload: {
        value: 'abc123'
      },
      promise: expect.toBePromise()
    })
    expect(dispatched.promise.isPending()).toBe(true)

    const result = await dispatched.promise
    expect(result).toEqual(['foo'])
  })

  test('action promise rejects with error', async () => {
    const testAction = createAction('TEST_ACTION', (value) => ({ value }))

    const runAsync = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('error')
        }, 500)
      })
    const actionHandler = handleAction(function*(context, action) {
      expect(context).toEqual({})
      expect(action).toEqual({
        type: 'TEST_ACTION',
        payload: {
          value: 'abc123'
        },
        promise: expect.toBePromise()
      })
      return yield runAsync()
    })

    const engine = createEngine(
      {
        test: {
          run: function*() {
            yield takeEvery(testAction, actionHandler)
          }
        }
      },
      {}
    )

    const dispatched = engine.dispatch(testAction('abc123'))
    expect(dispatched).toEqual({
      type: 'TEST_ACTION',
      payload: {
        value: 'abc123'
      },
      promise: expect.toBePromise()
    })
    expect(dispatched.promise.isPending()).toBe(true)

    try {
      await dispatched.promise
    } catch (error) {
      expect(error).toBe('error')
    }
  })
})
