import { batchUpdateEntity } from '../Entity'

import { UserPreferences } from './schemas'

const batchUpdateUserPreferences = batchUpdateEntity(UserPreferences)

export default batchUpdateUserPreferences
