import { batchDeleteEntity } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const batchDeleteUserPreferences = batchDeleteEntity(UserPreferences)

export default batchDeleteUserPreferences
