import { saveEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const saveConversation = saveEntity(Conversation)

export default saveConversation
