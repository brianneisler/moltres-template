import { AuthState } from '../../../constants'
import { AuthStateChangedAction } from './schemas'
import { call, cancel, cancelled, select, takeEvery } from 'redux-saga/effects'
import selectAuthState from './selectors/selectAuthState'
import selectCurrentUser from './selectors/selectCurrentUser'

const watchCurrentUser = function*(handler) {
  let task
  try {
    yield call(function*() {
      // trigger once immediately
      let currentAuthState = yield select(selectAuthState)
      let currentUser
      if (currentAuthState === AuthState.LOGGED_IN) {
        currentUser = yield select(selectCurrentUser)
        task = yield* handler({}, currentUser)
      }

      // watch for every change in auth state
      yield takeEvery(AuthStateChangedAction.name, function*(action) {
        const { authState } = action.payload
        if (authState !== currentAuthState) {
          currentAuthState = authState
          if (currentAuthState === AuthState.LOGGED_IN) {
            currentUser = yield select(selectCurrentUser)
            task = yield* handler({}, currentUser)
          } else {
            if (task) {
              yield cancel(task)
            }
            yield* handler(null)
          }
        }
      })
    })
  } finally {
    if (yield cancelled() && task) {
      yield cancel(task)
    }
  }
}

export default watchCurrentUser
