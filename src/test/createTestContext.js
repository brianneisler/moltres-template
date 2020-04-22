import { createLogger } from '../utils/logger'
import { createSystem } from '../context'
import firebase from 'firebase'
import initializeTestApp from './initializeTestApp'

const createTestContext = ({
  cache = {},
  config,
  logger = createLogger(),
  namespace,
  // storage,
  system = createSystem(),
  testAuth,
  ...rest
}) => {
  if (!config) {
    throw new Error('createContext expected config to be set')
  }
  const app = initializeTestApp({ auth: testAuth, config, namespace })
  const database = firebase.firestore(app)
  // const auth = firebase.auth(app)
  // storage = firebase.storage ? firebase.storage(app) : storage

  return {
    app,
    auth: null,
    cache,
    config,
    database,
    firebase,
    logger,
    namespace,
    storage: null,
    system,
    ...rest
  }
}

export default createTestContext
