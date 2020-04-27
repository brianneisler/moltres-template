import * as firebase from 'firebase'
import { createLogger } from '../utils/logger'
import { createServiceAccount } from '../db/ServiceAccount'
import { createSystem } from '../context'
import { initializeTestAdminApp } from '../utils/firebase'
import { uuidv4 } from '../utils/data'

const createTestAdminContext = async ({ config, namespace, source, ...rest }) => {
  if (!config) {
    throw new Error('createAdminContext expected config to be set')
  }
  const auth = null
  const storage = null

  const app = initializeTestAdminApp({ config, namespace })
  const database = firebase.firestore(app)
  const logger = createLogger()
  const system = createSystem()
  const context = {
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
