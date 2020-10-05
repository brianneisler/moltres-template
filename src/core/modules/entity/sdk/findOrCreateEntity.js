import { findOneFromQuery } from '../../../../utils/db'
import { assoc, curry } from '../../../../utils/lang'

import createEntity from './createEntity'
import queryEntities from './queryEntities'

const findOrCreateEntity = curry(
  async (Schema, context, data, queryOptions = {}) => {
    queryOptions = assoc('limit', 1, queryOptions)
    const existingEntity = await findOneFromQuery(
      context,
      queryEntities(Schema, context, data, queryOptions),
      queryOptions
    )
    if (existingEntity) {
      return existingEntity
    }
    return createEntity(Schema, context, data)
  }
)

export default findOrCreateEntity
