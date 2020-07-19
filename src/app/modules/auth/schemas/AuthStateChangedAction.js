import { Object } from '../../../../core'
import { Action } from '../../../../db/Action'

import AuthState from './AuthState'
import CurrentUser from './CurrentUser'

const AuthStateChangedAction = {
  name: 'auth.AuthStateChangedAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        authState: AuthState.schema.required(),
        currentUser: CurrentUser.schema
      })
      .required()
  })
}

export default AuthStateChangedAction
