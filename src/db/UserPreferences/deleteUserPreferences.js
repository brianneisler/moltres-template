import { deleteEntity } from '../Entity'

import { UserPreferences } from './schemas'

const deleteUserPreferences = deleteEntity(UserPreferences)

export default deleteUserPreferences
