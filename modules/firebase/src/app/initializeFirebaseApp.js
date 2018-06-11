import firebase from 'firebase'
import { put, select } from 'moltres'
import { setFirebaseApp } from '../actions'
import selectFirebaseApp from '../selectFirebaseApp'
import selectFirebaseConfig from '../selectFirebaseConfig'

function* initializeFirebaseApp(name = 'default') {
  const config = yield select(selectFirebaseConfig(name))
  let app = yield select(selectFirebaseApp(name))
  if (app) {
    return app
  }

  app = firebase.initializeApp(config)
  yield put(setFirebaseApp(name, app))
  return app
}

export default initializeFirebaseApp
