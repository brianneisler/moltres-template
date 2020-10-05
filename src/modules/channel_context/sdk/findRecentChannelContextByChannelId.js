import { buildQuery, findOneFromQuery } from '../../../utils/db'
import { assoc } from '../../../utils/lang'
import { ChannelContext } from '../schemas'

const queryRecentChannelContext = (context, channelId, queryOptions) =>
  buildQuery(
    (query) =>
      query.where('channelId', '==', channelId).orderBy('createdAt', 'desc'),
    ChannelContext,
    context,
    queryOptions
  )

const findRecentChannelContextByChannelId = async (
  context,
  channelId,
  queryOptions = {}
) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return findOneFromQuery(
    context,
    queryRecentChannelContext(context, channelId, queryOptions),
    queryOptions
  )
}

export default findRecentChannelContextByChannelId
