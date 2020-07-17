import { String } from '../../../../core'
import { Action } from '../../../../db/Action'

const SetAuthIdTokenAction = {
  name: 'auth.SetAuthStateAction',
  schema: Action.schema.keys({
    payload: String.schema.allow(null)
  })
}

export default SetAuthIdTokenAction
