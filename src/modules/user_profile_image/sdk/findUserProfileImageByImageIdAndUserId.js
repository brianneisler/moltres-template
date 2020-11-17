import { findOneFromQuery } from 'moltres/db'
import { assoc } from 'moltres/lang'

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
