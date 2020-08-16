import { saveEntity } from '../Entity'

import { UserPreferences } from './schemas'

const saveUserPreferences = saveEntity(UserPreferences)

export default saveUserPreferences
