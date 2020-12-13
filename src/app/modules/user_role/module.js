import { withConfig, withContext } from 'moltres/core'
import { assoc, compose } from 'moltres/lang'
import { call, fork, handleAction, handleActions } from 'moltres/redux'
import { watchCurrentUser } from '../auth'

import * as actions from './actions'
import queryAndWatchCurrentUserRole from './queryAndWatchCurrentUserRole'

const enhance = compose(withConfig('api'), withContext())

const mod = () => ({
  reducer: handleActions(
    {
      [actions.setCurrentUserRole]: (state, action) =>
        assoc('currentUserRole', action.payload.currentUserRole, state)
    },
    {
      // undefined indicates that these values have not been loaded.
      // null inidicates that this value was loaded but does not exist
      currentUserRole: undefined
    }
  ),
  *run() {
    yield fork(
      watchCurrentUser,
      handleAction(
        enhance(function* (context, currentUser) {
          if (currentUser) {
            return yield call(
              queryAndWatchCurrentUserRole,
              context,
              currentUser
            )
          }
        })
      )
    )
  }
})

export default mod
