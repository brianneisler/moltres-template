import { findDocumentById } from 'moltres/db'

import { ConversationMessage } from '../schemas'

const findConversationMessageById = findDocumentById(ConversationMessage)

export default findConversationMessageById
