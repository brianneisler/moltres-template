import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchDeleteEntity from './batchDeleteEntity'

const deleteEntity = curry(async (Schema, context, id, options = {}) => {
  const { database } = context
  const batch = database.batch()
  await batchDeleteEntity(Schema, context, batch, id, options)
  return commitBatch(batch)
})

export default deleteEntity
