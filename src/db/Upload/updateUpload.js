import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchUpdateUpload from './batchUpdateUpload'

const updateUpload = curry(async (context, id, updates) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchUpdateUpload(context, batch, id, updates)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default updateUpload
