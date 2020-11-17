import { batchCreateEntity } from 'moltres/core'

import { UserPreferences } from '../schemas'

const batchCreateUserPreferences = batchCreateEntity(UserPreferences)

export default batchCreateUserPreferences
