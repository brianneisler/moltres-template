import { getDocumentById } from 'moltres/db'
import { ChannelContext } from '../schemas'

const getChannelContextById = getDocumentById(ChannelContext)

export default getChannelContextById
