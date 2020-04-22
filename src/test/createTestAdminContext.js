import * as firebase from 'firebase'
import { createLogger } from '../utils/logger'
import { createServiceAccount } from '../db/ServiceAccount'
import { createSystem } from '../context'
import { uuidv4 } from '../utils/data'
import initializeTestAdminApp from './initializeTestAdminApp'

const createTestAdminContext = async ({ config, namespace, source, ...rest }) => {
  if (!config) {
    throw new Error('createAdminContext expected config to be set')
  }
  const auth = null
  const storage = null

  const adminApp = initializeTestAdminApp({ config, namespace })
  const database = firebase.firestore(adminApp)
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
  return {
    ...context,
    serviceAccount
  }
}

export default createTestAdminContext
