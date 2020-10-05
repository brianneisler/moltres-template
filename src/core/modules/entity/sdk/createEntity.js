import { buildBatch, commitBatch, getFromRef } from '../../../../utils/db'
import { curry } from '../../../../utils/lang'

import batchCreateEntity from './batchCreateEntity'

const createEntity = curry(async (Schema, context, value, options = {}) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreateEntity(Schema, context, batch, value, options)
    })
  )
  return await getFromRef(context, ref)
})

export default createEntity
