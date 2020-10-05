import { Action, Object, String } from '../../../../core'

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
