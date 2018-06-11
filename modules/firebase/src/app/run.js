import { call } from 'moltres'
import initializeFirebaseApp from './initializeFirebaseApp'

function* run() {
  yield call(initializeFirebaseApp, 'default')
}

export default run
