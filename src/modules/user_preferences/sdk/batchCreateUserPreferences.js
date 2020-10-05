import { batchCreateEntity } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const batchCreateUserPreferences = batchCreateEntity(UserPreferences)

export default batchCreateUserPreferences
