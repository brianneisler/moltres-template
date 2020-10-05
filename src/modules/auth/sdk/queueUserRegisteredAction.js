import { queueAction } from '../../../core/sdk'
import { UserRegisteredAction } from '../schemas'

const queueUserRegisteredAction = queueAction(UserRegisteredAction)

export default queueUserRegisteredAction
