import { batchDeleteEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const batchDeleteConversation = batchDeleteEntity(Conversation)

export default batchDeleteConversation
