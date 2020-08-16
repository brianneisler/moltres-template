import { batchCreateEntity } from '../Entity'

import { Preference } from './schemas'

const batchCreatePreference = batchCreateEntity(Preference)

export default batchCreatePreference
