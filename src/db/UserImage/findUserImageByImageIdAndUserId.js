import { assoc } from '../../utils/data'
import { findOneFromQuery } from '../../utils/db'
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
