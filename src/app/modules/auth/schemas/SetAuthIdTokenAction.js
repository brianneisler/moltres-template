import { Action } from '../../../../db/Action'
import { String } from '../../../../core'

const SetAuthIdTokenAction = {
  name: 'auth.SetAuthStateAction',
  schema: Action.schema.keys({
    payload: String.schema.allow(null)
  })
}

export default SetAuthIdTokenAction
