import { batchRemoveEntity } from '../Entity'

import { Preference } from './schemas'

const batchRemovePreference = batchRemoveEntity(Preference)

export default batchRemovePreference
