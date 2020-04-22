import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchDeleteError from './batchDeleteError'

const deleteError = curry(async (context, id) => {
  const { database } = context
  const batch = database.batch()
  await batchDeleteError(context, batch, id)
  return commitBatch(batch)
})

export default deleteError
