import { UserSignedInAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const userSignedInAction = actionBuilder({
  Schema: UserSignedInAction
})

export default userSignedInAction
