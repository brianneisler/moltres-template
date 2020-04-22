import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchDeleteNotificationSend from './batchDeleteNotificationSend'

const deleteNotificationSend = curry(async (context, id, options = {}) => {
  const { database } = context
  const batch = database.batch()
  await batchDeleteNotificationSend(context, batch, id, options)
  return commitBatch(batch)
})

export default deleteNotificationSend
