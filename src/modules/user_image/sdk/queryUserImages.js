import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'
import { UserImage } from '../schemas'

const queryUserImages = curry((context, { imageId, userId }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(imageId)) {
        query = query.where('imageId', '==', imageId)
      }
      if (!isUndefined(userId)) {
        query = query.where('userId', '==', userId)
      }
      return query
    },
    UserImage,
    context,
    queryOptions
  )
)

export default queryUserImages
