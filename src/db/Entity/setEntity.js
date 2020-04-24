import { buildBatch, commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchSetEntity from './batchSetEntity'

const setEntity = curry(async (Schema, context, id, value, options = {}) => {
  let ref
  await commitBatch(
    buildBatch(context, async (batch) => {
      ref = await batchSetEntity(Schema, context, batch, id, value, options)
    })
  )
  return getFromRef(context, ref)
})

export default setEntity
