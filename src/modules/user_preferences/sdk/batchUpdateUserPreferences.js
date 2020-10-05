import { batchUpdateEntity } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const batchUpdateUserPreferences = batchUpdateEntity(UserPreferences)

export default batchUpdateUserPreferences
