import { batchRemoveEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const batchRemoveConversationMessage = batchRemoveEntity(ConversationMessage)

export default batchRemoveConversationMessage
