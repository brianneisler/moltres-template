import { Action } from '../../../../db/Action'
import Joi from '@hapi/joi'

const SignOutAction = {
  name: 'auth.SignOutAction',
  schema: Action.schema.keys({
    payload: Joi.object()
      .allow(null)
      .required()
  })
}

export default SignOutAction
