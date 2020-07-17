import batchQueueAction from '../Action/batchQueueAction'

import { EntityChangedAction } from './schemas'

const batchQueueEntityChangedAction = batchQueueAction(EntityChangedAction)

export default batchQueueEntityChangedAction
