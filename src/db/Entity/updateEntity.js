import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchUpdateEntity from './batchUpdateEntity'

const updateEntity = curry(async (Schema, context, id, updates, options = {}) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchUpdateEntity(Schema, context, batch, id, updates, options)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default updateEntity
