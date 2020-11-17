import { batchRemoveEntity } from 'moltres/core'
import { PhoneNumber } from '../schemas'

const batchRemovePhoneNumber = batchRemoveEntity(PhoneNumber)

export default batchRemovePhoneNumber
