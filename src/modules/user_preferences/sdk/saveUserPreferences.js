import { saveEntity } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const saveUserPreferences = saveEntity(UserPreferences)

export default saveUserPreferences
