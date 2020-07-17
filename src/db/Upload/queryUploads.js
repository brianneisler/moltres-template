import { Upload } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/lang'

const queryUploads = curry((context, { userId }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(userId)) {
        query = query.where('userId', '==', userId)
      }
      return query
    },
    Upload,
    context,
    queryOptions
  )
)

export default queryUploads
