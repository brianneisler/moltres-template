import { ChannelContext } from './schemas'
import { assocProp } from '../../utils/data'
import { buildQuery, findOneFromQuery } from '../../utils/db'

const queryRecentChannelContext = (context, channelId, queryOptions) =>
  buildQuery(
    (query) => query.where('channelId', '==', channelId).orderBy('createdAt', 'desc'),
    ChannelContext,
    context,
    queryOptions
  )

const findRecentChannelContextByChannelId = async (context, channelId, queryOptions = {}) => {
  queryOptions = assocProp('limit', 1, queryOptions)
  return findOneFromQuery(
    context,
    queryRecentChannelContext(context, channelId, queryOptions),
    queryOptions
  )
}

export default findRecentChannelContextByChannelId
