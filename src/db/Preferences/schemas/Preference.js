import { Any, Id, String } from '../../../core/schemas'
import { Entity } from '../../Entity'
import { UserPreferences } from '../../UserPreferences/schemas'

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
