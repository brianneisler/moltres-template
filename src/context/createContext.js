import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import { createLogger } from '../utils/logger'
import createSystem from './createSystem'
import initializeApp from '../utils/firebase/initializeApp'

// NOTE BRN: This method must remain synchronous because it is needed to boot up
// the web App without disruption
const createContext = ({
  cache = {},
  config,
  logger = createLogger(),
  namespace,
  storage,
  system = createSystem(),
  ...rest
}) => {
  if (!config) {
    throw new Error('createContext expected config to be set')
  }
  let analytics
  const app = initializeApp({ cache, config, firebase, namespace })
  if (!config.ssr && config.firebase.appId && config.firebase.measurementId) {
    analytics = firebase.analytics(app)
  }
  const database = firebase.firestore(app)
  const realtime = firebase.database(app)
  const auth = firebase.auth(app)
  storage = storage ? storage : firebase.storage ? firebase.storage(app) : null

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
