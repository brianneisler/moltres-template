import { takeEvery } from 'redux-saga'
import { fork, put, take } from 'redux-saga/effects'
import { appReady, awaitApp, initApp } from './actions'

function* awaitAppSaga() {
  yield* takeEvery(awaitApp.toString(), handleAwaitApp)
}

function* handleAwaitApp() {
  const appReadyAction = yield take(appReady.toString())
  yield put(initApp(appReadyAction.payload.app))
}

export default function* root() {
  yield [
    fork(awaitAppSaga)
  ]
}
