import { Object } from '../../../../core/schemas'
import { Action } from '../../../../db/Action'

const SignOutAction = {
  name: 'auth.SignOutAction',
  schema: Action.schema.keys({
    payload: Object.schema.allow(null).required()
  })
}

export default SignOutAction
