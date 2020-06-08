import { buildQuery } from '../../utils/db'
import { curry, forEach, isUndefined } from '../../utils/data'

const queryUserImages = curry((Schema, context, data, queryOptions) =>
  buildQuery(
    (query) => {
      forEach(())
      if (!isUndefined(imageId)) {
        query = query.where('imageId', '==', imageId)
      }
      if (!isUndefined(userId)) {
        query = query.where('userId', '==', userId)
      }
      return query
    },
    Schema,
    context,
    queryOptions
  )
)

export default queryUserImages
