import { UserPhoneNumber } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteUserPhoneNumber = batchDeleteEntity(UserPhoneNumber)

export default batchDeleteUserPhoneNumber
