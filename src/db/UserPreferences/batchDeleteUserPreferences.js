import { batchDeleteEntity } from '../Entity'

import { UserPreferences } from './schemas'

const batchDeleteUserPreferences = batchDeleteEntity(UserPreferences)

export default batchDeleteUserPreferences
