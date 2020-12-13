import { actionBuilder } from 'moltres/redux'
import { UserSignedOutAction } from '../schemas'

const userSignedOutAction = actionBuilder({
  Schema: UserSignedOutAction
})

export default userSignedOutAction
