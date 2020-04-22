import { SMSChannel } from './schemas'
import { deleteEntity } from '../Entity'

const deleteSMSChannel = deleteEntity(SMSChannel)

export default deleteSMSChannel
