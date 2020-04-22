import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchCreateEntity from './batchCreateEntity'

const createEntity = curry(async (Schema, context, value, options = {}) => {
  const { database } = context
  const batch = database.batch()
  const ref = batchCreateEntity(Schema, context, batch, value, options)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default createEntity
