import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'

import { Upload } from '../schemas'

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
