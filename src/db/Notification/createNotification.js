import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchCreateNotification from './batchCreateNotification'

const createNotification = curry(async (context, value) => {
  const { database } = context
  const batch = database.batch()
  const ref = batchCreateNotification(context, batch, value)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default createNotification
