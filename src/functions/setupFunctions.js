import * as functions from 'firebase-functions'
import { setupActionsFunction } from './actions'
import { setupAppFunction } from './app'
import { setupScheduleFunctions } from './schedule'
import {
  setupStorageDeleteFunction,
  setupStorageFinalizeFunction,
  setupStorageMetadataUpdateFunction
} from './storage'
import setupFunctionConfig from './setupFunctionConfig'

const setupFunctions = () => {
  const runtimeOptions = {
    memory: '2GB',
    timeoutSeconds: 60
  }
  const config = setupFunctionConfig()

  return {
    actions: functions
      .runWith(runtimeOptions)
      .firestore.document('Actions/{type}/queue/{id}')
      .onCreate(setupActionsFunction(config)),
    app: functions.runWith(runtimeOptions).https.onRequest(setupAppFunction(config)),
    storage_delete: functions
      .runWith(runtimeOptions)
      .storage.object()
      .onDelete(setupStorageDeleteFunction(config)),
    storage_finalize: functions
      .runWith(runtimeOptions)
      .storage.object()
      .onFinalize(setupStorageFinalizeFunction(config)),
    storage_metadata_update: functions
      .runWith(runtimeOptions)
      .storage.object()
      .onMetadataUpdate(setupStorageMetadataUpdateFunction(config)),
    ...setupScheduleFunctions(config, {
      ...runtimeOptions,
      timeoutSeconds: 9 * 60 // Maximum allowed value
    })
  }
}

export default setupFunctions
