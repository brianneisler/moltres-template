import { actionBuilder } from 'moltres/redux'
import { RegisterUserAction } from '../schemas'

const registerUserAction = actionBuilder({
  Schema: RegisterUserAction
})

export default registerUserAction
