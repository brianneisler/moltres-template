import { batchRemoveEntity } from '../../../core/sdk'
import { PhoneNumber } from '../schemas'

const batchRemovePhoneNumber = batchRemoveEntity(PhoneNumber)

export default batchRemovePhoneNumber
