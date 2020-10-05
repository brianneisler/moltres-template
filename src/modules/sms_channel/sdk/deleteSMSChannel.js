import { deleteEntity } from '../../../core/sdk'
import { SMSChannel } from '../schemas'

const deleteSMSChannel = deleteEntity(SMSChannel)

export default deleteSMSChannel
