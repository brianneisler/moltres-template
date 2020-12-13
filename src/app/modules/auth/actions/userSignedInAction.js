import { actionBuilder } from 'moltres/redux'
import { UserSignedInAction } from '../schemas'

const userSignedInAction = actionBuilder({
  Schema: UserSignedInAction
})

export default userSignedInAction
