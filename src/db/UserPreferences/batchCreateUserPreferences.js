import { batchCreateEntity } from '../Entity'

import { UserPreferences } from './schemas'

const batchCreateUserPreferences = batchCreateEntity(UserPreferences)

export default batchCreateUserPreferences
