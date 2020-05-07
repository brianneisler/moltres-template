import { curry } from '../../utils/data'
import { refDocumentById } from '../../utils/db'
import createEntity from './createEntity'
import updateEntity from './updateEntity'

const saveEntity = curry(async (Schema, context, data) => {
  const entity = await refDocumentById(Schema, context, data.id)
  if (entity) {
    return updateEntity(Schema, context, data.id, data)
  }
  return createEntity(context, data)
})

export default saveEntity