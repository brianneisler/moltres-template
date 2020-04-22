import { ChannelContext } from './schemas'
import { getDocumentById } from '../../utils/db'

const getChannelContextById = getDocumentById(ChannelContext)

export default getChannelContextById
