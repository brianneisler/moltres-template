import { File } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

const queryFiles = curry(
  (context, { contentType, hash, path, storageBucket }, queryOptions) =>
    buildQuery(
      (query) => {
        if (!isUndefined(contentType)) {
          query = query.where('contentType', '==', contentType)
        }
        if (!isUndefined(hash)) {
          query = query.where('hash', '==', hash)
        }
        if (!isUndefined(path)) {
          query = query.where('path', '==', path)
        }
        if (!isUndefined(storageBucket)) {
          query = query.where('storageBucket', '==', storageBucket)
        }
        return query
      },
      File,
      context,
      queryOptions
    )
)

export default queryFiles
