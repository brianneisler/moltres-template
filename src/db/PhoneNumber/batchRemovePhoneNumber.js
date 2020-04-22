import { PhoneNumber } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemovePhoneNumber = batchRemoveEntity(PhoneNumber)

export default batchRemovePhoneNumber
