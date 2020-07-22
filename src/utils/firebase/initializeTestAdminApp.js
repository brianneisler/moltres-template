import { invariant, isObject, isString } from '../lang'

import initializeEmulatorApp from './initializeEmulatorApp'

/** Passing this in tells the emulator to treat you as an admin. */
const ADMIN_TOKEN = 'owner'

const initializeTestAdminApp = ({ config, firebase, namespace }) => {
  invariant(isString(namespace), 'namespace must be a defined String')
  invariant(isObject(config), 'config must be a defined Object')
  invariant(
    isObject(config.firebase),
    'firebase config must be a defined Object'
  )
  invariant(
    isString(config.firebase.projectId),
    'firebase projectId must be a defined String'
  )

  const { projectId } = config.firebase

  return initializeEmulatorApp({
    accessToken: ADMIN_TOKEN,
    databaseName: projectId,
    firebase,
    namespace,
    projectId
  })
}

export default initializeTestAdminApp
