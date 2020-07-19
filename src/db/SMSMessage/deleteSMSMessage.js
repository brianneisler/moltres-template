import { deleteEntity } from '../Entity'

import { SMSMessage } from './schemas'

const deleteSMSMessage = deleteEntity(SMSMessage)

export default deleteSMSMessage
