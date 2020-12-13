import { findOrCreateEntity } from 'moltres/core'
import { UserPreferences } from '../schemas'

const findOrCreateUserPreferences = findOrCreateEntity(UserPreferences)

export default findOrCreateUserPreferences
