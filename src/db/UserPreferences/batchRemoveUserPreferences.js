import { batchRemoveEntity } from '../Entity'

import { UserPreferences } from './schemas'

const batchRemoveUserPreferences = batchRemoveEntity(UserPreferences)

export default batchRemoveUserPreferences
