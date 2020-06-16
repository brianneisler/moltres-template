import { buildQuery } from '../../utils/db'
import { curry, forEach, isUndefined } from '../../utils/data'

const queryEntities = curry((Schema, context, data, queryOptions) =>
  buildQuery(
    (query) => {
      forEach((value, field) => {
        if (!isUndefined(value)) {
          query = query.where(field, '==', value)
        }
      }, data)
      return query
    },
    Schema,
    context,
    queryOptions
  )
)

export default queryEntities
