import { Host } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

const queryHosts = curry((context, { domain, subDomain, topLevelDomain }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(domain)) {
        query = query.where('domain', '==', domain)
      }
      if (!isUndefined(subDomain)) {
        query = query.where('subDomain', '==', subDomain)
      }
      if (!isUndefined(topLevelDomain)) {
        query = query.where('topLevelDomain', '==', topLevelDomain)
      }
      return query
    },
    Host,
    context,
    queryOptions
  )
)

export default queryHosts
