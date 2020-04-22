import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchRemoveEntity from './batchRemoveEntity'

const removeEntity = curry(async (Schema, context, id, updates = {}, options = {}) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchRemoveEntity(Schema, context, batch, id, updates, options)
  await commitBatch(batch)
  return ref // NOTE BRN: This will only be accessible by admins
})

export default removeEntity
