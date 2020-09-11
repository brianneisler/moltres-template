import * as functions from 'firebase-functions'

import { setupActionsFunction } from './actions'
import { setupAppFunction } from './app'
import * as modules from './modules'
import { setupScheduleFunctions } from './schedule'
import setupFunctionConfig from './setupFunctionConfig'
import {
  setupStorageDeleteFunction,
  setupStorageFinalizeFunction,
  setupStorageMetadataUpdateFunction
} from './storage'

const setupFunctions = () => {
  const runtimeOptions = {
    memory: '2GB',
    timeoutSeconds: 60
  }
  const config = setupFunctionConfig(modules)

  return {
    actions: functions
      .runWith(runtimeOptions)
      .firestore.document('Actions/{type}/queue/{id}')
      .onCreate(setupActionsFunction(modules, config)),
    app: functions
      .runWith(runtimeOptions)
      .https.onRequest(setupAppFunction(modules, config)),
    storage_delete: functions
      .runWith(runtimeOptions)
      .storage.object()
      .onDelete(setupStorageDeleteFunction(modules, config)),
    storage_finalize: functions
      .runWith(runtimeOptions)
      .storage.object()
      .onFinalize(setupStorageFinalizeFunction(modules, config)),
    storage_metadata_update: functions
      .runWith(runtimeOptions)
      .storage.object()
      .onMetadataUpdate(setupStorageMetadataUpdateFunction(modules, config)),
    ...setupScheduleFunctions(modules, config, {
      ...runtimeOptions,
      timeoutSeconds: 9 * 60 // Maximum allowed value
    })
  }
}

export default setupFunctions
