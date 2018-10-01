import Firebase from 'firebase'
import firebaseApi from '@moltres/firebase/api'
import firebaseApp from '@moltres/firebase/app'
import { createEngine, stop } from 'moltres'
import { generateNamespace, setupConfig } from 'moltres-test'
import { isFirebaseApp, map } from 'moltres-utils'
import { resolve } from 'path'
import * as api from '../src/api'
import * as app from '../src/app'

describe('integration: start and stop firebase module', () => {
  let config
  let engine

  afterEach(async () => {
    await stop(engine)
    config = null
    engine = null
  })

  const runStartAndStopTest = async ({ default: storage, generateConfig, namespace, type }) => {
    config = generateConfig(setupConfig, {
      env: resolve(__dirname, '..', '..', '..'),
      namespace
    })
    engine = createEngine(
      {
        firebase: type === 'app' ? firebaseApp : firebaseApi,
        storage: (...args) => map(jest.fn, firebase(...args))
      },
      config
    )
    const module = engine.getModules().storage

    expect(module.setup).toHaveBeenCalledWith(engine, firebaseModule)
    expect(module.finally).not.toHaveBeenCalled()

    const context = engine.getContext()

    expect(context.storage).toBeInstanceOf(Firebase.database.Database)
    expect(context.app.namespace).toBe(namespace)
    expect(context.app.name).toBe(`${type}:${namespace || '[DEFAULT]'}`)
    expect(context.database.namespace).toBe(namespace)

    await stop(engine)

    expect(module.finally).toHaveBeenCalledWith(engine, firebaseModule)
  }

  test('starts and stops the engine with the storage API module without a namespace', async () =>
    runStartAndStopTest({
      ...api,
      type: 'api'
    }))

  test('starts and stops the engine with the storage API module WITH a namespace', async () =>
    runStartAndStopTest({
      ...api,
      namespace: generateNamespace(),
      type: 'api'
    }))

  test('starts and stops the engine with the storage APP module without a namespace', async () =>
    runStartAndStopTest({
      ...app,
      type: 'app'
    }))

  test('starts and stops the engine with the storage APP module WITH a namespace', async () =>
    runStartAndStopTest({
      ...app,
      namespace: generateNamespace(),
      type: 'app'
    }))
})
