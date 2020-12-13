import { assoc } from 'moltres/lang'

import { findOneFromQuery } from 'moltres/db'

import queryUserImages from './queryUserImages'

const findUserImageByImageIdAndUserId = async (
  context,
  imageId,
  userId,
  queryOptions = {}
) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return findOneFromQuery(
    context,
    queryUserImages(context, { imageId, userId }, queryOptions),
    queryOptions
  )
}

export default findUserImageByImageIdAndUserId
