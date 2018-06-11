import Storage from '@google-cloud/storage'
import { pick, put, select } from 'moltres'
import { setGoogleCloudStorage } from '../actions'
import selectGoogleCloudConfig from './selectGoogleCloudConfig'
import selectGoogleCloudStorage from './selectGoogleCloudStorage'

function* initializeGoogleCloudStorage(name = 'default') {
  const config = yield select(selectGoogleCloudConfig(name))
  let storage = yield select(selectGoogleCloudStorage(name))
  if (storage) {
    return storage
  }
  // https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
  storage = new Storage(pick([ 'projectId', 'credentials' ], config))
  yield put(setGoogleCloudStorage(name, storage))
  return storage
}

export default initializeGoogleCloudStorage
