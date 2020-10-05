import { batchUpdateEntity } from '../../../core/sdk'
import { Preference } from '../schemas'

const batchUpdatePreference = batchUpdateEntity(Preference)

export default batchUpdatePreference
