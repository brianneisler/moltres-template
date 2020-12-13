import { withConfig, withContext } from 'moltres/core'
import { assoc, compose } from 'moltres/lang'
import {
  call,
  handleAction,
  handleActions,
  put,
  select,
  take,
  takeEvery
} from 'moltres/redux'
import { buildLocation } from 'moltres/url'
import {
  AuthStateChangedAction,
  selectAfterLogin,
  signInWithIdTokenAction
} from '../auth'

import * as actions from './actions'
import { requestAuthSMSChallenge, requestAuthWithSMSCode } from './sdk'
import selectAuthSMSChallengeId from './selectAuthSMSChallengeId'

const enhance = compose(withConfig('api'), withContext())

const mod = () => ({
  reducer: handleActions(
    {
      [actions.setSMSChallengeId]: (state, action) =>
        assoc('smsChallengeId', action.payload.smsChallengeId, state)
    },
    {
      smsChallengeId: null
    }
  ),
  routes: [
    {
      exact: true,
      *handle() {
        const smsChallengeId = yield select(selectAuthSMSChallengeId)
        if (!smsChallengeId) {
          const afterLogin = yield select(selectAfterLogin)
          return {
            redirect: buildLocation({
              pathname: '/login',
              query: { afterLogin }
            }),
            statusCode: 302
          }
        }
        return { statusCode: 200 }
      },
      path: '/login/code'
    }
  ],
  *run() {
    yield takeEvery(
      actions.requestSMSChallenge,
      handleAction(
        enhance(function* (context, event) {
          const result = yield call(
            requestAuthSMSChallenge,
            context,
            event.payload
          )
          yield put(actions.setSMSChallengeId(result.smsChallengeId))
        })
      )
    )

    yield takeEvery(
      actions.authWithSMSCode,
      handleAction(
        enhance(function* (context, event) {
          const result = yield call(
            requestAuthWithSMSCode,
            context,
            event.payload
          )
          // Take access token and authenticate with it then store the idToken
          // into state (this is done by an auth state monitor)
          yield put(signInWithIdTokenAction(context, { idToken: result.token }))
          return yield take(AuthStateChangedAction.name)
        })
      )
    )
  }
})

export default mod
