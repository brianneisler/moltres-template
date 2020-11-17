import { batchUpdateEntity } from 'moltres/core'
import { Preference } from '../schemas'

const batchUpdatePreference = batchUpdateEntity(Preference)

export default batchUpdatePreference
