import { AuthState } from '../../../constants'
import { withConfig, withContext } from '../../../core'
import { queryAndWatchUserEnhancedNotifications } from '../../../db/Notification'
import { compose } from '../../../utils/lang'
import { call, fork, select } from '../../../utils/redux'
import { selectAuthState, watchCurrentUser } from '../auth'

const enhance = compose(withConfig(), withContext())

const mod = () => ({
  routes: [
    {
      exact: true,
      handle: enhance(function* ({ config }) {
        if (config.target === 'ssr') {
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
})

export default mod
