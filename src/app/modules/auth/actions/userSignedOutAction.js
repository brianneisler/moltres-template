import { actionBuilder } from '../../../../utils/redux'
import { UserSignedOutAction } from '../schemas'

const userSignedOutAction = actionBuilder({
  Schema: UserSignedOutAction
})

export default userSignedOutAction
