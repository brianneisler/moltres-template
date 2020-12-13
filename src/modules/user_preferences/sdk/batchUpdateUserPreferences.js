import { batchUpdateEntity } from 'moltres/core'
import { UserPreferences } from '../schemas'

const batchUpdateUserPreferences = batchUpdateEntity(UserPreferences)

export default batchUpdateUserPreferences
