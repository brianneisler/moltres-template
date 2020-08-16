import { findAllFromQuery } from '../../utils/db'
import { curry } from '../../utils/lang'
import { refQueueById } from '../Queue'

import queryQueueEntities from './queryQueueEntities'

const findAllQueueEntitiesByQueueId = curry(
  async (context, queueId, queryOptions = {}) =>
    findAllFromQuery(
      context,
      queryQueueEntities(
        {
          ...context,
          parentRef: refQueueById(context, queueId)
        },
        {},
        queryOptions
      ),
      queryOptions
    )
)

export default findAllQueueEntitiesByQueueId
