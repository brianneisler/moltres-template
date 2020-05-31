import { RegisterUserAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const registerUserAction = actionBuilder({
  Schema: RegisterUserAction
})

export default registerUserAction
