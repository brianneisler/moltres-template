import { removeEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const removeConversation = removeEntity(Conversation)

export default removeConversation
