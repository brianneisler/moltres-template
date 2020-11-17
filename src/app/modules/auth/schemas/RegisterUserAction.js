import { Action, Object, String } from 'moltres/core'

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
