import { findOrCreateEntity } from '../Entity'

import { UserPreferences } from './schemas'

const findOrCreateUserPreferences = findOrCreateEntity(UserPreferences)

export default findOrCreateUserPreferences
