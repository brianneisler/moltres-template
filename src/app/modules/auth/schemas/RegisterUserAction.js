import { Action } from '../../../../db/Action'
import Joi from '@hapi/joi'

const RegisterUserAction = {
  name: 'auth.RegisterUserAction',
  schema: Action.schema.keys({
    payload: Joi.object()
      .keys({
        name: Joi.string().required(),
        phoneNumber: Joi.string().required()
      })
      .required()
  })
}

export default RegisterUserAction
