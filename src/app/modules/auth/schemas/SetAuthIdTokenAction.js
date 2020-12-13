import { Action, String } from 'moltres/core'

const SetAuthIdTokenAction = {
  name: 'auth.SetAuthStateAction',
  schema: Action.schema.keys({
    payload: String.schema.allow(null)
  })
}

export default SetAuthIdTokenAction
