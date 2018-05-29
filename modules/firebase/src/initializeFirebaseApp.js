import firebase from 'firebase'
import { put, select } from 'moltres'
import { setApp } from './actions'
import selectFirebaseApp from './selectFirebaseApp'

function* initializeFirebaseApp(name, config) {
  let app = yield select(selectFirebaseApp(name))
  if (app) {
    return app
  }

  app = firebase.initializeApp(config)
  yield put(setApp({
    name,
    app
  }))
  return app
}

export default initializeFirebaseApp
