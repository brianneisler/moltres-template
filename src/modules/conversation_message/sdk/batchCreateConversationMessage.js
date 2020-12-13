import { batchCreateEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const batchCreateConversationMessage = batchCreateEntity(ConversationMessage)

export default batchCreateConversationMessage
