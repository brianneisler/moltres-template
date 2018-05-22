import firebase from 'firebase'
import { put, select } from 'redux-saga/effects'
import { setApp } from './actions'
import { selectFirebaseApp } from './selectors'
import { selectWait } from '../'


export function* setupFirebaseApp(name, config) {
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
