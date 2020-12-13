import { deleteEntity } from 'moltres/core'
import { UserPreferences } from '../schemas'

const deleteUserPreferences = deleteEntity(UserPreferences)

export default deleteUserPreferences
