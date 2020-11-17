import { batchRemoveEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const batchRemoveConversation = batchRemoveEntity(Conversation)

export default batchRemoveConversation
