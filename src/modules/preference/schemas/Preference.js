import { Any, Entity, Id, String } from 'moltres/core'
import { UserPreferences } from '../../user_preferences/schemas'

const Preference = {
  collectionName: 'Preferences',
  idField: 'key',
  name: 'Preference',
  parentRefIdField: 'userPreferencesId',
  parentSchema: UserPreferences,
  schema: Entity.schema.keys({
    key: String.schema.required(),
    userPreferencesId: Id.schema.required(),
    value: Any.schema.required()
  })
}

export default Preference
