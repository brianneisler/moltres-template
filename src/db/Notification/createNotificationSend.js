import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchCreateNotificationSend from './batchCreateNotificationSend'

const createNotificationSend = curry(async (context, value, options = {}) => {
  const { database } = context
  const batch = database.batch()
  const ref = batchCreateNotificationSend(context, batch, value, options)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default createNotificationSend
