import { put } from 'redux-saga/effects'
import { createCommand } from '@moltres/driver/commands'
import * as actions from './actions'

const START_DAEMON = 'START_DAEMON'
const STOP_DAEMON = 'STOP_DAEMON'

export const startDaemon = createCommand(START_DAEMON, function* (command) {
  yield put(actions.startDaemon(command.options))
})

export const stopDaemon = createCommand(STOP_DAEMON, function* (command) {
  yield put(actions.stopDaemon(command.options))
})
