import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchUpdateError from './batchUpdateError'

const updateError = curry(async (context, id, updates) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchUpdateError(context, batch, id, updates)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default updateError
