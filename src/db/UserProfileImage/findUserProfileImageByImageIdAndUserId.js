import { assoc } from '../../utils/lang'
import { findOneFromQuery } from '../../utils/db'
import queryUserProfileImages from './queryUserProfileImages'

const findUserProfileImageByImageIdAndUserId = async (
  context,
  imageId,
  userId,
  queryOptions = {}
) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return findOneFromQuery(
    context,
    queryUserProfileImages(context, { imageId, userId }, queryOptions),
    queryOptions
  )
}

export default findUserProfileImageByImageIdAndUserId
