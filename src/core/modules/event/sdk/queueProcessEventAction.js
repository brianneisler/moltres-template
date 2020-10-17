import { queueAction } from '../../action'
import { ProcessEventAction } from '../schemas'

const queueProcessEventAction = queueAction(ProcessEventAction)

export default queueProcessEventAction
