import { Action } from 'moltres/core'

import CurrentUser from './CurrentUser'

const SetCurrentUserAction = {
  name: 'auth.SetCurrentUserAction',
  schema: Action.schema.keys({
    payload: CurrentUser.schema.required()
  })
}

export default SetCurrentUserAction
