import { findOrCreateEntity } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const findOrCreateUserPreferences = findOrCreateEntity(UserPreferences)

export default findOrCreateUserPreferences
