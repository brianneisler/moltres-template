import { UserSignedOutAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const userSignedOutAction = actionBuilder({
  Schema: UserSignedOutAction
})

export default userSignedOutAction
