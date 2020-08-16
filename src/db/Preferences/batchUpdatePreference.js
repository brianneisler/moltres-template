import { batchUpdateEntity } from '../Entity'

import { Preference } from './schemas'

const batchUpdatePreference = batchUpdateEntity(Preference)

export default batchUpdatePreference
