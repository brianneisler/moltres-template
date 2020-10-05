import { queryEntities } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const queryUserPreferences = queryEntities(UserPreferences)

export default queryUserPreferences
