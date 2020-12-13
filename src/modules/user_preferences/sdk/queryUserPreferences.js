import { queryEntities } from 'moltres/core'
import { UserPreferences } from '../schemas'

const queryUserPreferences = queryEntities(UserPreferences)

export default queryUserPreferences
