import path from 'path'
import pm2 from 'pm2'
import Promise from 'bluebird'
import { takeEvery } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'
import { startDaemon, stopDaemon } from './actions'

function* watchStartDaemon() {
  yield* takeEvery(startDaemon.toString(), handleStartDaemon)
}

function* watchStopDaemon() {
  yield* takeEvery(stopDaemon.toString(), handleStopDaemon)
}

export default function* root() {
  yield [
    fork(watchStartDaemon),
    fork(watchStopDaemon)
  ]
}

function* handleStartDaemon() {
  yield call(startMoltresDaemon)
}

function* handleStopDaemon() {
  yield call(stopMoltresDaemon)
}

function startMoltresDaemon() {
  return new Promise((resolve, reject) => {
    pm2.start({
      name: 'moltresd',
      script: path.resolve(__dirname, '../../..', 'daemon/init.js')
    }, (error, proc) => {
      if (!error) {
        resolve(proc)
      } else {
        reject(error)
      }
    })
  })
}

function stopMoltresDaemon() {
  return new Promise((resolve, reject) => {
    pm2.stop({
      name: 'moltresd'
    }, (error) => {
      if (!error) {
        resolve()
      } else {
        reject(error)
      }
    })
  })
}
