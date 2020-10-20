import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { curry } from '../../../utils/lang'

import batchCreateConversationMember from './batchCreateConversationMember'

const createConversationMember = curry(async (context, value, options = {}) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreateConversationMember(context, batch, value, options)
    })
  )
  return await getFromRef(context, ref)
})

export default createConversationMember
