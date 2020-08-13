import { REMOVE } from '../../constants/EntityChangeType'
import {
  batchRemoveDocument,
  cleanseData,
  refDocumentById,
  refGet
} from '../../utils/db'
import { curry } from '../../utils/lang'
import { validateSchema } from '../../utils/schema'

import { entityChanged } from './actions'
import batchQueueEntityChangedAction from './batchQueueEntityChangedAction'

const batchRemoveEntity = curry(
  async (Schema, context, batch, id, data = {}, options = {}) => {
    const ref = refDocumentById(Schema, context, id)
    let { document } = context
    if (!document) {
      document = await refGet(context, ref)
    }

    // validate the data post removal using the existing data
    const prevData = document.data()
    validateSchema(
      Schema,
      cleanseData({
        ...prevData,
        ...data
      })
    )

    batchRemoveDocument(Schema, context, batch, id, data)

    if (!options.noChangeActions) {
      const action = entityChanged(context, {
        changeType: REMOVE,
        data: cleanseData(data),
        entityId: ref.id,
        entityPath: ref.path,
        entityType: Schema.name,
        prevData
      })
      batchQueueEntityChangedAction(context, batch, action)
    }
    return ref
  }
)

export default batchRemoveEntity
