import { batchRemoveEntity } from 'moltres/core'
import { UserPreferences } from '../schemas'

const batchRemoveUserPreferences = batchRemoveEntity(UserPreferences)

export default batchRemoveUserPreferences
