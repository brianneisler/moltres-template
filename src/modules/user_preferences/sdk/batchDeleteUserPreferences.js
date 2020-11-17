import { batchDeleteEntity } from 'moltres/core'
import { UserPreferences } from '../schemas'

const batchDeleteUserPreferences = batchDeleteEntity(UserPreferences)

export default batchDeleteUserPreferences
