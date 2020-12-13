import { queryEntities } from 'moltres/core'

import { Conversation } from '../schemas'

const queryConversations = queryEntities(Conversation)

export default queryConversations
