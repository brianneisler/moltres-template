import { actionBuilder } from '../../../../utils/redux'
import { UserSignedInAction } from '../schemas'

const userSignedInAction = actionBuilder({
  Schema: UserSignedInAction
})

export default userSignedInAction
