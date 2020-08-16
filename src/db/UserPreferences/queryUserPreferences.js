import { queryEntities } from '../Entity'

import { UserPreferences } from './schemas'

const queryUserPreferences = queryEntities(UserPreferences)

export default queryUserPreferences
