import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { curry } from '../../../utils/lang'

import batchCreateConversation from './batchCreateConversation'

const createConversation = curry(async (context, value, options = {}) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreateConversation(context, batch, value, options)
    })
  )
  return await getFromRef(context, ref)
})

export default createConversation
