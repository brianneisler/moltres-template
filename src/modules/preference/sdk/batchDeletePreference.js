import { batchDeleteEntity } from '../../../core/sdk'
import { Preference } from '../schemas'

const batchDeletePreference = batchDeleteEntity(Preference)

export default batchDeletePreference
