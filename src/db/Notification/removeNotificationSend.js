import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchRemoveNotificationSend from './batchRemoveNotificationSend'

const removeNotificationSend = curry(async (context, id, options = {}) => {
  const { database } = context
  const batch = database.batch()
  await batchRemoveNotificationSend(context, batch, id, options)
  return commitBatch(batch)
})

export default removeNotificationSend
