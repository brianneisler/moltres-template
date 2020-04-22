import { UserRegisteredAction } from '../schemas'
import { actionBuilder } from '../../../utils/lang'

const userRegistered = actionBuilder({
  Schema: UserRegisteredAction,
  // TODO BRN: Update this to pick based upon the schema
  payload: (context, { data, method, userId }) => ({
    data,
    method,
    userId
  })
})

export default userRegistered
