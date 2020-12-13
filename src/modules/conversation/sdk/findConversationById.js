import { findDocumentById } from 'moltres/db'

import { Conversation } from '../schemas'

const findConversationById = findDocumentById(Conversation)

export default findConversationById
