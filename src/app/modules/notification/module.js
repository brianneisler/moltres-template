import { AuthState } from '../../../constants'
import { call, fork, select } from '../../../utils/lang'
import { compose } from '../../../utils/data'
import { queryAndWatchUserEnhancedNotifications } from '../../../db/Notification'
import { selectAuthState, watchCurrentUser } from '../auth'
import { withConfig, withContext } from '../../../core'

const enhance = compose(withConfig(), withContext())

const mod = {
  routes: [
    {
      exact: true,
      handle: enhance(function* ({ config }) {
        if (config.ssr) {
          return { statusCode: 200 }
        }
        const authState = yield select(selectAuthState)
        if (authState === AuthState.LOGGED_OUT) {
          return { redirect: '/', statusCode: 302 }
        }
        return { statusCode: 200 }
      }),
      path: '/notifications',
      preload: enhance(function* (context, { first }) {
        if (first) {
          yield fork(watchCurrentUser, function* (currentUser) {
            if (currentUser) {
              return yield call(
                queryAndWatchUserEnhancedNotifications,
                context,
                currentUser
              )
            }
          })
        }
      })
    }
  ]
}

export default mod
