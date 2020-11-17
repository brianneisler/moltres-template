import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'
import { Url } from '../schemas'

const queryUrls = curry(
  (context, { hash, hostId, pathname, port, protocol, search }, queryOptions) =>
    buildQuery(
      (query) => {
        if (!isUndefined(hash)) {
          query = query.where('hash', '==', hash)
        }
        if (!isUndefined(hostId)) {
          query = query.where('hostId', '==', hostId)
        }
        if (!isUndefined(pathname)) {
          query = query.where('pathname', '==', pathname)
        }
        if (!isUndefined(port)) {
          query = query.where('port', '==', port)
        }
        if (!isUndefined(protocol)) {
          query = query.where('protocol', '==', protocol)
        }
        if (!isUndefined(search)) {
          query = query.where('search', '==', search)
        }
        return query
      },
      Url,
      context,
      queryOptions
    )
)

export default queryUrls
