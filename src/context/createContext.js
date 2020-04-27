import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import { createLogger } from '../utils/logger'
import {
  initializeApp,
  initializeAuthEmulator,
  initializeStorageEmulator,
  initializeTestApp
} from '../utils/firebase'
import { invariant } from '../utils/lang'
import { isObject } from '../utils/data'
import { isTestAppConfigured } from '../utils/config'
import createSystem from './createSystem'

// NOTE BRN: This method must remain synchronous because it is needed to boot up
// the web App without disruption
const createContext = ({
  cache = {},
  config,
  logger = createLogger(),
  namespace,
  storage,
  system = createSystem(),
  testAuth,
  ...rest
}) => {
  invariant(isObject(config), 'config must be a defined Object')

  let analytics
  let app
  let auth

  if (isTestAppConfigured(config)) {
    app = initializeTestApp({ auth: testAuth, config, namespace })
    auth = initializeAuthEmulator({ app })
    storage = initializeStorageEmulator({ app })
  } else {
    app = initializeApp({ cache, config, firebase, namespace })
    auth = firebase.auth(app)
    storage = storage ? storage : firebase.storage ? firebase.storage(app) : null
    if (!config.ssr && config.firebase.appId && config.firebase.measurementId) {
      analytics = firebase.analytics(app)
    }
  }
  const database = firebase.firestore(app)
  const realtime = firebase.database(app)

  return {
    analytics,
    app,
    auth,
    cache,
    config,
    database,
    firebase,
    logger,
    namespace,
    realtime,
    storage,
    system,
    ...rest
  }
}

export default createContext
