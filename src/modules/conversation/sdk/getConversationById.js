import { getDocumentById } from 'moltres/db'

import { Conversation } from '../schemas'

const getConversationById = getDocumentById(Conversation)

export default getConversationById
