import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchUpdateNotification from './batchUpdateNotification'

const updateNotification = curry(async (context, id, updates) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchUpdateNotification(context, batch, id, updates)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default updateNotification
