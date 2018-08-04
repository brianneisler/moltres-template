import Firebase from 'firebase'
import { createEngine, stop } from 'moltres'
import { generateNamespace, setupConfig } from 'moltres-test'
import { isFirebaseApp, map } from 'moltres-utils'
import { resolve } from 'path'
import * as api from '../src/api'
import * as app from '../src/app'
import * as _test from '../src/test'

describe('integration: start and stop firebase module', () => {
  let config
  let engine

  afterEach(async () => {
    await stop(engine)
    config = null
    engine = null
  })

  const runStartAndStopTest = async ({ default: firebase, generateConfig, namespace, type }) => {
    config = generateConfig(setupConfig, {
      env: resolve(__dirname, '..', '..', '..'),
      namespace
    })
    engine = createEngine(
      {
        firebase: (...args) => map(jest.fn, firebase(...args))
      },
      config
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
      ...api,
      type: 'api'
    }))

  test('starts and stops the engine with the firebase API module WITH a namespace', async () =>
    runStartAndStopTest({
      ...api,
      namespace: generateNamespace(),
      type: 'api'
    }))

  test('starts and stops the engine with the firebase APP module without a namespace', async () =>
    runStartAndStopTest({
      ...app,
      type: 'app'
    }))

  test('starts and stops the engine with the firebase APP module WITH a namespace', async () =>
    runStartAndStopTest({
      ...app,
      namespace: generateNamespace(),
      type: 'app'
    }))

  test('starts and stops the engine with the firebase TEST module without a namespace', async () =>
    runStartAndStopTest({
      ..._test,
      type: 'test'
    }))

  test('starts and stops the engine with the firebase TEST module WITH a namespace', async () =>
    runStartAndStopTest({
      ..._test,
      namespace: generateNamespace(),
      type: 'test'
    }))
})
