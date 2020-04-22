import { SMSMessage } from './schemas'
import { createEntity } from '../Entity'

const createSMSMessage = createEntity(SMSMessage)

export default createSMSMessage
