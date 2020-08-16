import { queryEntities } from '../Entity'

import { Preference } from './schemas'

const queryPreferences = queryEntities(Preference)

export default queryPreferences
