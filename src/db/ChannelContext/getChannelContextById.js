import { getDocumentById } from '../../utils/db'

import { ChannelContext } from './schemas'

const getChannelContextById = getDocumentById(ChannelContext)

export default getChannelContextById
