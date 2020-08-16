import { batchDeleteEntity } from '../Entity'

import { Preference } from './schemas'

const batchDeletePreference = batchDeleteEntity(Preference)

export default batchDeletePreference
