import { DELETE } from '../../constants/EntityChangeType'
import { batchDeleteDocument, batchDeleteIndexes } from '../../utils/db'
import { curry } from '../../utils/data'
import { entityChanged } from './actions'
import batchQueueEntityChangedAction from './batchQueueEntityChangedAction'

const batchDeleteEntity = curry(async (Schema, context, batch, id, options = {}) => {
  const ref = batchDeleteDocument(Schema, context, batch, id)
  const refDoc = await ref.get()
  const prevData = refDoc.data()

  batchDeleteIndexes(Schema, context, batch, prevData)
  if (!options.noChangeActions) {
    const action = entityChanged(context, {
      changeType: DELETE,
      data: null,
      entityId: ref.id,
      entityPath: ref.path,
      entityType: Schema.name,
      prevData
    })
    batchQueueEntityChangedAction(context, batch, action)
  }
  return ref
})

export default batchDeleteEntity
