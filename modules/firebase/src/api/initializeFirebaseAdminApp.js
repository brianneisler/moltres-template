import admin from 'firebase-admin'
import { put, select } from 'moltres'
import { setFirebaseApp } from '../actions'
import selectFirebaseApp from '../selectFirebaseApp'
import selectFirebaseConfig from '../selectFirebaseConfig'

function* initializeFirebaseAdminApp(name = 'default') {
  const config = yield select(selectFirebaseConfig(name))
  let app = yield select(selectFirebaseApp(name))
  if (app) {
    return app
  }

  const { serviceAccount, ...rest } = config
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ...rest
  })
  yield put(setFirebaseApp(name, app))
  return app
}

export default initializeFirebaseAdminApp
