import { batchRemoveEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const batchRemoveConversation = batchRemoveEntity(Conversation)

export default batchRemoveConversation
