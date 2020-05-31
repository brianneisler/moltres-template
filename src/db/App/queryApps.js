import { App } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

const queryApps = curry((context, { description, name, slug, url }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(description)) {
        query = query.where('description', '==', description)
      }
      if (!isUndefined(name)) {
        query = query.where('name', '==', name)
      }
      if (!isUndefined(slug)) {
        query = query.where('slug', '==', slug)
      }
      if (!isUndefined(url)) {
        query = query.where('url', '==', url)
      }
      return query
    },
    App,
    context,
    queryOptions
  )
)

export default queryApps
