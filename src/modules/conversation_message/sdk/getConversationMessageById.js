import { getDocumentById } from 'moltres/db'

import { ConversationMessage } from '../schemas'

const getConversationMessageById = getDocumentById(ConversationMessage)

export default getConversationMessageById
