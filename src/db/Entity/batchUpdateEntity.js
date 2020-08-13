import { UPDATE } from '../../constants/EntityChangeType'
import {
  batchUpdateDocument,
  batchUpdateIndexes,
  cleanseData,
  refDocumentById,
  refGet
} from '../../utils/db'
import { curry } from '../../utils/lang'
import { validateSchema } from '../../utils/schema'

import { entityChanged } from './actions'
import batchQueueEntityChangedAction from './batchQueueEntityChangedAction'

const batchUpdateEntity = curry(
  async (Schema, context, batch, id, data, options = {}) => {
    const ref = refDocumentById(Schema, context, id)

    // Validate updates using new data mixed with previous data
    const document = await refGet(context, ref)
    const prevData = document.data()
    const nextData = validateSchema(
      Schema,
      cleanseData({
        ...prevData,
        ...data
      })
    )
    batchUpdateIndexes(Schema, context, batch, nextData, document)

    if (!options.noChangeActions) {
      batchQueueEntityChangedAction(
        context,
        batch,
        entityChanged(context, {
          changeType: UPDATE,
          data: cleanseData(data),
          entityId: ref.id,
          entityPath: ref.path,
          entityType: Schema.name,
          prevData
        })
      )
    }

    return batchUpdateDocument(Schema, context, batch, id, data)
  }
)

export default batchUpdateEntity
