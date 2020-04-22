import * as firebase from 'firebase-admin'
import { createCustomToken } from '../utils/auth'
import { createLogger } from '../utils/logger'
import { createServiceAccount } from '../db/ServiceAccount'
import { initializeAdminApp } from '../utils/firebase'
import { uuidv4 } from '../utils/data'
import createSystem from './createSystem'

const createAdminContext = async ({ config, namespace, source, ...rest }) => {
  if (!config) {
    throw new Error('createAdminContext expected config to be set')
  }
  const adminApp = initializeAdminApp({ config, firebase, namespace })
  const database = firebase.firestore(adminApp)
  const auth = firebase.auth(adminApp)
  const storage = firebase.storage(adminApp)
  const logger = createLogger()
  const system = createSystem()

  const context = {
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
  }

  const uid = uuidv4()
  const serviceAccount = await createServiceAccount(context, {
    name: `service-user-${uid}`,
    uid
  })
  logger.info('serviceAccount created:', serviceAccount)
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
