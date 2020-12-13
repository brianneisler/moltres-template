import { updateEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const updateConversation = updateEntity(Conversation)

export default updateConversation
