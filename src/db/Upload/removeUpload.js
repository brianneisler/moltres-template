import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchRemoveUpload from './batchRemoveUpload'

const removeUpload = curry(async (context, id) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchRemoveUpload(context, batch, id)
  await commitBatch(batch)
  return ref
})

export default removeUpload
