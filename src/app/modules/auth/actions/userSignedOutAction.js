import { UserSignedOutAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const userSignedOutAction = actionBuilder({
  Schema: UserSignedOutAction
})

export default userSignedOutAction
