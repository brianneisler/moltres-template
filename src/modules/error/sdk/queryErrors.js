import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'

import { Error } from '../schemas'

const queryErrors = curry((context, { code }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(code)) {
        query = query.where('code', '==', code)
      }
      return query
    },
    Error,
    context,
    queryOptions
  )
)

export default queryErrors
