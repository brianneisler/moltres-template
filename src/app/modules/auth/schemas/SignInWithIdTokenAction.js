import { Object, String } from '../../../../core'
import { Action } from '../../../../db/Action'

const SignInWithIdTokenAction = {
  name: 'auth.SignInWithIdTokenAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        idToken: String.schema.required()
      })
      .required()
  })
}

export default SignInWithIdTokenAction
