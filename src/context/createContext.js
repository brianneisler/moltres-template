import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/performance'
import 'firebase/storage'
import firebase from 'firebase/app'

import { isTestAppConfigured } from '../utils/config'
import {
  initializeApp,
  initializeAuthEmulator,
  initializeStorageEmulator,
  initializeTestApp
} from '../utils/firebase'
import { invariant, isObject } from '../utils/lang'
import { createLogger } from '../utils/logger'
import { createSystem } from '../utils/system'

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
  let performance

  if (isTestAppConfigured(config)) {
    app = initializeTestApp({ auth: testAuth, config, firebase, namespace })
    auth = initializeAuthEmulator({ app })
    storage = initializeStorageEmulator({ app })
  } else {
    app = initializeApp({ cache, config, firebase, namespace })
    if (config.target !== 'ssr' && config.firebase.appId) {
      performance = firebase.performance(app)
    }
    auth = firebase.auth(app)
    storage = storage
      ? storage
      : firebase.storage
      ? firebase.storage(app)
      : null
    if (
      config.target !== 'ssr' &&
      config.firebase.appId &&
      config.firebase.measurementId
    ) {
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
    isContext: true,
    logger,
    namespace,
    performance,
    realtime,
    storage,
    system,
    ...rest
  }
}

export default createContext
