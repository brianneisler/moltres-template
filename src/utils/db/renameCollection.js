import { setEntity } from '../../db/Entity'
import paginateCollection from './paginateCollection'

const renameCollection = async (context, OldSchema, NewSchema) => {
  await paginateCollection(OldSchema, context, async (doc) => {
    const data = doc.data()
    await setEntity(NewSchema, context, doc.id, data, {
      noChangeActions: true
    })
  })
}

export default renameCollection
