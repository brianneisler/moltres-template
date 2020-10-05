import { batchCreateEntity } from '../../../core/sdk'
import { assoc } from '../../../utils/lang'
import { Queue } from '../schemas'

const batchCreateQueue = (context, batch, data) => {
  data = assoc('headIndex', 0, data)
  data = assoc('length', 0, data)
  data = assoc('tailIndex', -1, data)
  return batchCreateEntity(Queue, context, batch, data)
}

export default batchCreateQueue
