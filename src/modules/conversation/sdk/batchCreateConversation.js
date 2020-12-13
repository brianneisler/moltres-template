import { batchCreateEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const batchCreateConversation = batchCreateEntity(Conversation)

export default batchCreateConversation
