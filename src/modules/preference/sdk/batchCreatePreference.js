import { batchCreateEntity } from '../../../core/sdk'
import { Preference } from '../schemas'

const batchCreatePreference = batchCreateEntity(Preference)

export default batchCreatePreference
