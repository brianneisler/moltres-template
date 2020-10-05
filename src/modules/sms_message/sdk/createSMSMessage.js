import { createEntity } from '../../../core/sdk'
import { SMSMessage } from '../schemas'

const createSMSMessage = createEntity(SMSMessage)

export default createSMSMessage
