import { saveEntity } from 'moltres/core'
import { UserPreferences } from '../schemas'

const saveUserPreferences = saveEntity(UserPreferences)

export default saveUserPreferences
