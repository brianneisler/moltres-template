import { deleteEntity } from '../../../core/sdk'
import { UserPreferences } from '../schemas'

const deleteUserPreferences = deleteEntity(UserPreferences)

export default deleteUserPreferences
