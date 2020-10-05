import { batchQueueAction } from '../../action/sdk'
import { EntityChangedAction } from '../schemas'

const batchQueueEntityChangedAction = batchQueueAction(EntityChangedAction)

export default batchQueueEntityChangedAction
