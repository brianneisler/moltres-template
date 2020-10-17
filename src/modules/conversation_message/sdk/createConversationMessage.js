import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { curry } from '../../../utils/lang'

import batchCreateConversationMessage from './batchCreateConversationMessage'

const createConversationMessage = curry(
  async (context, value, options = {}) => {
    let ref
    await commitBatch(
      buildBatch(context, (batch) => {
        ref = batchCreateConversationMessage(context, batch, value, options)
      })
    )
    return await getFromRef(context, ref)
  }
)

export default createConversationMessage
