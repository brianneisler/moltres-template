import { Action, Object } from 'moltres/core'

const SignOutAction = {
  name: 'auth.SignOutAction',
  schema: Action.schema.keys({
    payload: Object.schema.allow(null).required()
  })
}

export default SignOutAction
