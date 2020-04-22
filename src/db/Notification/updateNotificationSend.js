import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchUpdateNotificationSend from './batchUpdateNotificationSend'

const updateNotificationSend = curry(async (context, id, updates) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchUpdateNotificationSend(context, batch, id, updates)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default updateNotificationSend
