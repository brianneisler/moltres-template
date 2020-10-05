import { deleteEntity } from '../../../core/sdk'
import { SMSChallenge } from '../schemas'

const deleteSMSChallenge = deleteEntity(SMSChallenge)

export default deleteSMSChallenge
