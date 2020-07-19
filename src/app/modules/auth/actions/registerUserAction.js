import { actionBuilder } from '../../../../utils/redux'
import { RegisterUserAction } from '../schemas'

const registerUserAction = actionBuilder({
  Schema: RegisterUserAction
})

export default registerUserAction
