import { UserRegisteredAction } from './schemas'
import { queueAction } from '../../db/Action'

const queueUserRegisteredAction = queueAction(UserRegisteredAction)

export default queueUserRegisteredAction
