import { EntityChangedAction } from './schemas'
import batchQueueAction from '../Action/batchQueueAction'

const batchQueueEntityChangedAction = batchQueueAction(EntityChangedAction)

export default batchQueueEntityChangedAction
