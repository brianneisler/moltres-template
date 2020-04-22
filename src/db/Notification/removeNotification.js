import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchRemoveNotification from './batchRemoveNotification'

const removeNotification = curry(async (context, id) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchRemoveNotification(context, batch, id)
  await commitBatch(batch)
  return ref
})

export default removeNotification
