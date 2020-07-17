import { curry } from '../../utils/lang'
import { refDocumentById } from '../../utils/db'
import createEntity from './createEntity'
import updateEntity from './updateEntity'

const saveEntity = curry(async (Schema, context, data) => {
  const entity = await refDocumentById(Schema, context, data.id)
  if (entity) {
    return updateEntity(Schema, context, data.id, data)
  }
  return createEntity(Schema, context, data)
})

export default saveEntity
