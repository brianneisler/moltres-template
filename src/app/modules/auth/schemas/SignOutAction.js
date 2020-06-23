import { Action } from '../../../../db/Action'
import { Object } from '../../../../core/schemas'

const SignOutAction = {
  name: 'auth.SignOutAction',
  schema: Action.schema.keys({
    payload: Object.schema.allow(null).required()
  })
}

export default SignOutAction
