import _ from 'mudash'
import { takeEvery } from 'redux-saga'
import { call, fork, select } from 'redux-saga/effects'
import { command } from './actions'

export function* commandsSaga() {
  yield* takeEvery(command.toString(), handleCommand)
}

const getCommandByType = type => state => _.get(commandsByType(_.get(state, 'commands')), type)

function commandsByType(commands) {
  return _.reduce(commands, (mapped, _command) => {
    return _.set(mapped, _command.type, _command)
  }, {})
}

function* handleCommand({ payload }) {
  const selectedCommand = yield select(getCommandByType(payload.type))
  if (selectedCommand) {
    yield call(selectedCommand.handler, payload)
  }
  //TODO add an action for unhandled commands
}

export default function* root() {
  yield [
    fork(commandsSaga)
  ]
}
