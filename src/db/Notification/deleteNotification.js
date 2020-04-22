import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchDeleteNotification from './batchDeleteNotification'

const deleteNotification = curry(async (context, id) => {
  const { database } = context
  const batch = database.batch()
  await batchDeleteNotification(context, batch, id)
  return commitBatch(batch)
})

export default deleteNotification
