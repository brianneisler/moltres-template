import { call } from 'moltres'
import initializeFirebaseAdminApp from './initializeFirebaseAdminApp'

function* run() {
  yield call(initializeFirebaseAdminApp, 'default')
}

export default run
