import { SMSMessage } from './schemas'
import { removeEntity } from '../Entity'

const removeSMSMessage = removeEntity(SMSMessage)

export default removeSMSMessage
