import Firebase from 'firebase'
import { createEngine, setupConfig, stop } from 'moltres'
import { generateNamespace, setupContext } from 'moltres-test'
import { isFirebaseApp, map } from 'moltres-utils'
import { resolve } from 'path'
import api from '../src/api'
import app from '../src/app'
import _test from '../src/test'

describe('integration: start and stop firebase module', () => {
  let engine

  afterEach(async () => {
    await stop(engine)
    engine = null
  })

  const runStartAndStopTest = async ({ module: firebase, namespace, type }) => {
    engine = createEngine(
      {
        firebase: {
          ...firebase,
          createModule: (...args) => map(jest.fn, firebase.createModule(...args))
        }
      },
      setupConfig,
      setupContext,
      {
        env: resolve(__dirname, '..', '..', '..'),
        namespace
      }
    )
    const firebaseModule = engine.getModules().firebase

    expect(firebaseModule.setup).toHaveBeenCalledWith(engine, firebaseModule)
    expect(firebaseModule.finally).not.toHaveBeenCalled()

    const context = engine.getContext()

    expect(isFirebaseApp(context.app)).toBe(true)
    expect(context.database).toBeInstanceOf(Firebase.database.Database)
    expect(context.app.namespace).toBe(namespace)
    expect(context.app.name).toBe(`${type}:${namespace || '[DEFAULT]'}`)
    expect(context.database.namespace).toBe(namespace)

    await stop(engine)

    expect(firebaseModule.finally).toHaveBeenCalledWith(engine, firebaseModule)
  }

  test('starts and stops the engine with the firebase API module without a namespace', async () =>
    runStartAndStopTest({
      module: api,
      type: 'api'
    }))

  test('starts and stops the engine with the firebase API module WITH a namespace', async () =>
    runStartAndStopTest({
      module: api,
      namespace: generateNamespace(),
      type: 'api'
    }))

  test('starts and stops the engine with the firebase APP module without a namespace', async () =>
    runStartAndStopTest({
      module: app,
      type: 'app'
    }))

  test('starts and stops the engine with the firebase APP module WITH a namespace', async () =>
    runStartAndStopTest({
      module: app,
      namespace: generateNamespace(),
      type: 'app'
    }))

  test('starts and stops the engine with the firebase TEST module without a namespace', async () =>
    runStartAndStopTest({
      module: _test,
      type: 'test'
    }))

  test('starts and stops the engine with the firebase TEST module WITH a namespace', async () =>
    runStartAndStopTest({
      module: _test,
      namespace: generateNamespace(),
      type: 'test'
    }))
})
