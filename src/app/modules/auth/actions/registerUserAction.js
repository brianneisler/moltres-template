import { RegisterUserAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const registerUserAction = actionBuilder({
  Schema: RegisterUserAction
})

export default registerUserAction
