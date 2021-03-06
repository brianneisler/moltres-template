import * as firebaseMain from 'firebase'
import * as firebaseAdmin from 'firebase-admin'

import { createContext as createCoreContext } from '../core'
import { createServiceAccount } from '../modules/service_account'
import { createCustomToken } from '../utils/auth'
import { isTestAppConfigured } from '../utils/config'
import {
  initializeAdminApp,
  initializeAuthEmulator,
  initializeStorageEmulator,
  initializeTestAdminApp
} from '../utils/firebase'
import { invariant, isObject, uuidv4 } from '../utils/lang'
import { createLogger } from '../utils/logger'
import { createSystem } from '../utils/system'

const createAdminContext = async ({ config, namespace, source, ...rest }) => {
  invariant(isObject(config), 'config must be a defined Object')

  let app
  let auth
  let firebase
  let storage
  if (isTestAppConfigured(config)) {
    firebase = firebaseMain
    app = initializeTestAdminApp({ config, firebase, namespace })
    auth = initializeAuthEmulator({ app, config })
    storage = initializeStorageEmulator({ app })
  } else {
    firebase = firebaseAdmin
    app = initializeAdminApp({ config, firebase, namespace })
    auth = firebase.auth(app)
    storage = firebase.storage(app)
  }
  const database = firebase.firestore(app)
  const logger = createLogger()
  const system = createSystem()

  const context = createCoreContext({
    app,
    auth,
    config,
    database,
    firebase,
    logger,
    namespace,
    source,
    storage,
    system,
    ...rest
  })

  const uid = uuidv4()
  const serviceAccount = await createServiceAccount(context, {
    name: `service-user-${uid}`,
    uid
  })
  logger.debug('serviceAccount created:', serviceAccount)
  const token = await createCustomToken(context, serviceAccount.id, {
    serviceAccountId: serviceAccount.id
  })
  return {
    ...context,
    serviceAccount,
    token
  }
}

export default createAdminContext
