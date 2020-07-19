import { queueAction } from '../../db/Action'

import { UserRegisteredAction } from './schemas'

const queueUserRegisteredAction = queueAction(UserRegisteredAction)

export default queueUserRegisteredAction
