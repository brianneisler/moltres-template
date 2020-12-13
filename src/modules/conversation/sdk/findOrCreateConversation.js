import { findOrCreateEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const findOrCreateConversation = findOrCreateEntity(Conversation)

export default findOrCreateConversation
