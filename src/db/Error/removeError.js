import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchRemoveError from './batchRemoveError'

const removeError = curry(async (context, id) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchRemoveError(context, batch, id)
  await commitBatch(batch)
  return ref
})

export default removeError
