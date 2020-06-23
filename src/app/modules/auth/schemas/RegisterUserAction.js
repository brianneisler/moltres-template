import { Action } from '../../../../db/Action'
import { Object, String } from '../../../../core/schemas'

const RegisterUserAction = {
  name: 'auth.RegisterUserAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        name: String.schema.required(),
        phoneNumber: String.schema.required()
      })
      .required()
  })
}

export default RegisterUserAction
