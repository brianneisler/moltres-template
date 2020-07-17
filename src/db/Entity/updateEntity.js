import { buildBatch, commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/lang'

import batchUpdateEntity from './batchUpdateEntity'

const updateEntity = curry(
  async (Schema, context, id, updates, options = {}) => {
    let ref
    await commitBatch(
      buildBatch(context, async (batch) => {
        ref = await batchUpdateEntity(
          Schema,
          context,
          batch,
          id,
          updates,
          options
        )
      })
    )
    return await getFromRef(context, ref)
  }
)

export default updateEntity
