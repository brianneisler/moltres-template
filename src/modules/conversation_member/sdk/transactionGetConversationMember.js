import { transactionGetEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const transactionGetConversationMember = transactionGetEntity(
  ConversationMember
)

export default transactionGetConversationMember
