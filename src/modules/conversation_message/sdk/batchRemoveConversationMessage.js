import { batchRemoveEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const batchRemoveConversationMessage = batchRemoveEntity(ConversationMessage)

export default batchRemoveConversationMessage
