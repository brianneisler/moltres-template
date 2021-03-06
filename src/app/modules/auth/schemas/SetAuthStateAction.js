import { Action } from '../../../../core'

import AuthState from './AuthState'

const SetAuthStateAction = {
  name: 'auth.SetAuthStateAction',
  schema: Action.schema.keys({
    payload: AuthState.schema.required()
  })
}

export default SetAuthStateAction
