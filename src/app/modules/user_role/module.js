import * as actions from './actions'
import { assocProp, compose } from '../../../utils/data'
import { call, fork, handleAction, handleActions } from '../../../utils/lang'
import { watchCurrentUser } from '../auth'
import { withConfig, withContext } from '../../../core'
import queryAndWatchCurrentUserRole from './queryAndWatchCurrentUserRole'

const enhance = compose(withConfig('api'), withContext())

const mod = {
  reducer: handleActions(
    {
      [actions.setCurrentUserRole]: (state, action) =>
        assocProp('currentUserRole', action.payload.currentUserRole, state)
    },
    {
      // undefined indicates that these values have not been loaded.
      // null inidicates that this value was loaded but does not exist
      currentUserRole: undefined
    }
  ),
  run: function* run() {
    yield fork(
      watchCurrentUser,
      handleAction(
        enhance(function*(context, currentUser) {
          if (currentUser) {
            return yield call(queryAndWatchCurrentUserRole, context, currentUser)
          }
        })
      )
    )
  }
}

export default mod
