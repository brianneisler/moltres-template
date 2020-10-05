import { buildBatch, commitBatch } from '../../../../utils/db'
import { curry } from '../../../../utils/lang'

import batchDeleteEntity from './batchDeleteEntity'

const deleteEntity = curry(async (Schema, context, id, options = {}) => {
  return await commitBatch(
    buildBatch(context, async (batch) => {
      await batchDeleteEntity(Schema, context, batch, id, options)
    })
  )
})

export default deleteEntity
