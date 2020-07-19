import { deleteEntity } from '../Entity'

import { SMSChannel } from './schemas'

const deleteSMSChannel = deleteEntity(SMSChannel)

export default deleteSMSChannel
