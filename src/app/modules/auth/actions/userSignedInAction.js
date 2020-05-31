import { UserSignedInAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const userSignedInAction = actionBuilder({
  Schema: UserSignedInAction
})

export default userSignedInAction
