import { buildBatch, commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchRemoveEntity from './batchRemoveEntity'

const removeEntity = curry(async (Schema, context, id, updates = {}, options = {}) => {
  let ref
  await commitBatch(
    buildBatch(context, async (batch) => {
      ref = await batchRemoveEntity(Schema, context, batch, id, updates, options)
    })
  )
  return ref // NOTE BRN: This will only be accessible by admins
})

export default removeEntity
