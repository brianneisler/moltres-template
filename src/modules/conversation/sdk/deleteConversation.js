import { deleteEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const deleteConversation = deleteEntity(Conversation)

export default deleteConversation
