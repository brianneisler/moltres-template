import { queryEntities } from '../../../core/sdk'
import { Preference } from '../schemas'

const queryPreferences = queryEntities(Preference)

export default queryPreferences
