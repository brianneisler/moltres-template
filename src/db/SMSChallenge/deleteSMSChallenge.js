import { SMSChallenge } from './schemas'
import { deleteEntity } from '../Entity'

const deleteSMSChallenge = deleteEntity(SMSChallenge)

export default deleteSMSChallenge
