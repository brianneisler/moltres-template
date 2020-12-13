import { deleteEntity } from 'moltres/core'
import { SMSMessage } from '../schemas'

const deleteSMSMessage = deleteEntity(SMSMessage)

export default deleteSMSMessage
