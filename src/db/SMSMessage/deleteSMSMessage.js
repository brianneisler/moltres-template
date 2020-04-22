import { SMSMessage } from './schemas'
import { deleteEntity } from '../Entity'

const deleteSMSMessage = deleteEntity(SMSMessage)

export default deleteSMSMessage
