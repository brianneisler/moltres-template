import { SMSMessage } from './schemas'
import { updateEntity } from '../Entity'

const updateSMSMessage = updateEntity(SMSMessage)

export default updateSMSMessage
