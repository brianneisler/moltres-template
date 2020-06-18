import { UserProfileImage } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/lang'

const queryUserProfileImages = curry(
  (context, { imageId, userId }, queryOptions) =>
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
      UserProfileImage,
      context,
      queryOptions
    )
)

export default queryUserProfileImages
