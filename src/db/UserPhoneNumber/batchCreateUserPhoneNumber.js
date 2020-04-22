import { UserPhoneNumber } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateUserPhoneNumber = batchCreateEntity(UserPhoneNumber)

export default batchCreateUserPhoneNumber
