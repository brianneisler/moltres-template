import * as actions from './actions'
import { call, put } from 'redux-saga/effects'
import queryAndWatchUserRole from './queryAndWatchUserRole'

const queryAndWatchCurrentUserRole = function* (context, currentUser) {
  const watcher = yield call(queryAndWatchUserRole, context, currentUser.id, {
    *handler(currentUserRole) {
      yield put(actions.setCurrentUserRole(currentUserRole))
    }
  })
  return watcher.task
}

export default queryAndWatchCurrentUserRole
