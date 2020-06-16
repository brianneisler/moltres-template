import { AuthState } from '../../../constants'
import {
  AuthStateChangedAction,
  SetAuthIdTokenAction,
  SetAuthStateAction,
  SetCurrentUserAction,
  SignInWithIdTokenAction,
  SignOutAction
} from './schemas'
import {
  all,
  call,
  handleAction,
  handleActions,
  put,
  select,
  takeEvery
} from '../../../utils/lang'
import { append, assoc, compose, getProp } from '../../../utils/data'
import {
  authStateChangedAction,
  setAuthIdTokenAction,
  setAuthStateAction,
  setCurrentUserAction,
  signOutAction
} from './actions'
import { findUserById } from '../../../db/User'
import { firebaseAuthStateChanged } from '../../../core/actions'
import { getUserIdToken, signInWithIdToken, signOut } from '../../../utils/auth'
import { actions as overlayActions } from '../overlay'
import { pushRouteAction } from '../router/actions'
import { selectAfterLogin, selectAuthState } from './selectors'
import { setContext, withConfig, withContext } from '../../../core'

const enhance = compose(withConfig(), withContext())

const mod = {
  reducer: handleActions(
    {
      [SetAuthIdTokenAction.name]: (state, action) =>
        assoc('idToken', action.payload, state),
      [SetAuthStateAction.name]: (state, action) =>
        assoc('authState', action.payload, state),
      [SetCurrentUserAction.name]: (state, action) =>
        assoc('currentUser', action.payload, state)
    },
    {
      authState: AuthState.UNKNOWN,
      // undefined indicates that these values have not been loaded.
      // null inidicates that this value was loaded but does not exist
      currentUser: undefined,
      idToken: undefined
    }
  ),
  routes: [
    {
      exact: true,
      handle: enhance(function* ({ config }) {
        if (config.ssr) {
          return { statusCode: 200 }
        }
        const authState = yield select(selectAuthState)
        if (authState === AuthState.LOGGED_IN) {
          return { redirect: '/', statusCode: 302 }
        }
        return { statusCode: 200 }
      }),
      path: '/login'
    },
    // TODO BRN: Once we have the current user on server side we can perform the
    // signOut and redirect directly from here instead of client side.
    {
      exact: true,
      handle: enhance(function* (context) {
        if (context.config.ssr) {
          return { statusCode: 200 }
        }
        const authState = yield select(selectAuthState)

        if (authState === AuthState.LOGGED_IN) {
          yield put(signOutAction(context))
        }
        return { redirect: '/', statusCode: 302 }
      }),
      path: '/logout'
    }
  ],
  run: function* run() {
    // yield takeEvery(
    //   actions.registerUser,
    //   handleAction(
    //     enhance(function*(context, action) {
    //       const { database } = context
    //       console.log('context:', context)
    //       console.log('database:', database)
    //       console.log('database.ref:', database.ref)
    //       console.log('action:', action)
    //       const { claim, user, phoneNumber } = yield call(
    //         registerPendingUser,
    //         { database },
    //         action.payload
    //       )
    //       console.log('')
    //       // TODO BRN: make a request to the auth/sms api
    //     })
    //   )
    // )

    yield takeEvery(
      SignInWithIdTokenAction.name,
      handleAction(
        enhance(function* (context, { payload }) {
          yield call(signInWithIdToken, context, payload.idToken)
        })
      )
    )

    yield takeEvery(
      SignOutAction.name,
      handleAction(
        enhance(function* (context) {
          return yield call(signOut, context)
        })
      )
    )

    yield takeEvery(AuthStateChangedAction.name, function* ({ payload }) {
      if (payload.AuthStateChangedAction === AuthState.LOGGED_IN) {
        const afterLogin = yield select(selectAfterLogin)
        let actionSet = []
        if (getProp('redirect', afterLogin)) {
          actionSet = append(
            put(pushRouteAction(getProp('redirect', afterLogin))),
            actionSet
          )
        } else {
          actionSet = append(put(pushRouteAction('/')), actionSet)
        }
        if (getProp('showOverlay', afterLogin)) {
          actionSet = append(
            put(overlayActions.showOverlay(getProp('showOverlay', afterLogin))),
            actionSet
          )
        }
        yield all(actionSet)
      }
    })

    // NOTE BRN: This does not get picked up because this action is currently
    // dispatched in a batch
    // yield takeEvery(actions.setCurrentUser, function*(action) {
    //   yield call(setContext, 'currentUser', action.payload.currentUser)
    // })

    yield takeEvery(
      firebaseAuthStateChanged,
      handleAction(
        enhance(function* (context, action) {
          const firebaseUser = action.payload
          if (firebaseUser) {
            const [idToken, currentUser] = yield all([
              call(getUserIdToken, context, firebaseUser),
              call(findUserById, context, firebaseUser.uid)
            ])

            // NOTE BRN: In the event that we load a user that doesn't exist, we
            // log the user out (user has been deleted from db)
            if (!currentUser) {
              return yield put(signOutAction(context))
            }

            yield all([
              call(setContext, 'currentUser', currentUser),
              put([
                setAuthIdTokenAction(context, idToken),
                setCurrentUserAction(context, currentUser),
                setAuthStateAction(context, AuthState.LOGGED_IN)
              ])
            ])
            yield put(
              authStateChangedAction(context, {
                authState: AuthState.LOGGED_IN,
                currentUser
              })
            )
          } else {
            yield all([
              call(setContext, 'currentUser', null),
              put([
                setAuthIdTokenAction(context, null),
                setCurrentUserAction(context, null),
                setAuthStateAction(context, AuthState.LOGGED_OUT)
              ])
            ])
            yield put(
              authStateChangedAction({ authState: AuthState.LOGGED_OUT })
            )
          }
        })
      )
    )
  }
}

export default mod
