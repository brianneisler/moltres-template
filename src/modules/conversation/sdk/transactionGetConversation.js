import { transactionGetEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const transactionGetConversation = transactionGetEntity(Conversation)

export default transactionGetConversation
