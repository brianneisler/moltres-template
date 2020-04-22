import { UserPhoneNumber } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateUserPhoneNumber = batchUpdateEntity(UserPhoneNumber)

export default batchUpdateUserPhoneNumber
