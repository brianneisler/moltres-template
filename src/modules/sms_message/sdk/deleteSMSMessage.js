import { deleteEntity } from '../../../core/sdk'
import { SMSMessage } from '../schemas'

const deleteSMSMessage = deleteEntity(SMSMessage)

export default deleteSMSMessage
