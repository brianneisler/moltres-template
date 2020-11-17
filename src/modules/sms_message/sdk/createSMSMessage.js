import { createEntity } from 'moltres/core'
import { SMSMessage } from '../schemas'

const createSMSMessage = createEntity(SMSMessage)

export default createSMSMessage
