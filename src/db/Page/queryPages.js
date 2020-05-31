import { Page } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

const queryPages = curry((context, { code }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(code)) {
        query = query.where('code', '==', code)
      }
      return query
    },
    Page,
    context,
    queryOptions
  )
)

export default queryPages
