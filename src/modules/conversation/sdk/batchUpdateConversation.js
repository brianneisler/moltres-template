import { batchUpdateEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const batchUpdateConversation = batchUpdateEntity(Conversation)

export default batchUpdateConversation
