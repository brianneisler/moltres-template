import { PageContent } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/lang'

const queryPageContents = curry((context, { code }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(code)) {
        query = query.where('code', '==', code)
      }
      return query
    },
    PageContent,
    context,
    queryOptions
  )
)

export default queryPageContents
