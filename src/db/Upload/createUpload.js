import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchCreateUpload from './batchCreateUpload'

const createUpload = curry(async (context, value) => {
  const { database } = context
  const batch = database.batch()
  const ref = batchCreateUpload(context, batch, value)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default createUpload
