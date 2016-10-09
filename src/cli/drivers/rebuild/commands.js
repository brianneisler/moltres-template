import { put } from 'redux-saga/effects'
import { createCommand } from '../commands'
import * as actions from './actions'

const REBUILD_DEPENDENCIES = 'REBUILD_DEPENDENCIES'

export const rebuildDependencies = createCommand(REBUILD_DEPENDENCIES, function* (command) {
  yield put(actions.rebuildDependencies({ path: command.path, options: command.options}))
})
