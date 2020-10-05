import { batchRemoveEntity } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const batchRemoveUserPreferences = batchRemoveEntity(UserPreferences)

export default batchRemoveUserPreferences
