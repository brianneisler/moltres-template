import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchDeleteUpload from './batchDeleteUpload'

const deleteUpload = curry(async (context, id) => {
  const { database } = context
  const batch = database.batch()
  await batchDeleteUpload(context, batch, id)
  return commitBatch(batch)
})

export default deleteUpload
