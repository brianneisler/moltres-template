import { call } from 'moltres'
import initializeFirebaseApp from './initializeFirebaseApp'

function* setup(config) {
  return yield call(initializeFirebaseApp, 'default', config)
}

export default setup
