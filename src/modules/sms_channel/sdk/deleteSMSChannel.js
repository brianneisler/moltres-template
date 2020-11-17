import { deleteEntity } from 'moltres/core'
import { SMSChannel } from '../schemas'

const deleteSMSChannel = deleteEntity(SMSChannel)

export default deleteSMSChannel
