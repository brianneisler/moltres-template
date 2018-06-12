import { call } from 'moltres'
import initializeGoogleCloudStorage from './initializeGoogleCloudStorage'

function* run() {
  yield call(initializeGoogleCloudStorage, 'default')
}

export default run
