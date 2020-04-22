import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchCreateError from './batchCreateError'

const createError = curry(async (context, value) => {
  const { database } = context
  const batch = database.batch()
  const ref = batchCreateError(context, batch, value)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default createError
