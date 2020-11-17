import { queryEntities } from 'moltres/core'
import { Preference } from '../schemas'

const queryPreferences = queryEntities(Preference)

export default queryPreferences
