import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchSetEntity from './batchSetEntity'

const setEntity = curry(async (Schema, context, id, value, options = {}) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchSetEntity(Schema, context, batch, id, value, options)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default setEntity
